(() => {
  const svg = document.querySelector('[data-neural-network]');
  if (!svg) return;

  const layoutPoints = [
    [55, 315], [190, 280], [310, 180], [450, 115], [595, 155],
    [755, 100], [900, 170], [600, 65], [765, 260], [920, 310],
    [475, 260], [615, 330], [790, 400], [935, 470], [650, 470],
    [475, 450], [325, 365], [325, 515], [495, 575], [655, 590],
    [810, 560], [195, 460], [145, 590], [105, 155], [250, 75],
    [355, 55], [95, 60], [915, 55],
  ];
  const branches = [
    [0, 1], [0, 23], [0, 21], [1, 2], [1, 16], [2, 3], [2, 10],
    [2, 24], [3, 4], [3, 25], [4, 5], [4, 7], [5, 6], [5, 27],
    [6, 8], [8, 9], [8, 11], [10, 11], [11, 12], [11, 14],
    [12, 13], [12, 20], [14, 15], [14, 19], [15, 16], [15, 18],
    [16, 17], [17, 18], [17, 21], [18, 19], [20, 19], [21, 22],
    [23, 24], [23, 26],
  ];
  // Split the long branches into smaller hops, with a little spatial variation.
  const connections = [];
  branches.forEach(([from, to], index) => {
    let previous = from;
    for (let hop = 1; hop < 3; hop += 1) {
      const next = layoutPoints.length;
      const progress = hop / 3;
      layoutPoints.push([
        layoutPoints[from][0] + (layoutPoints[to][0] - layoutPoints[from][0]) * progress + Math.sin(index * 1.9 + hop) * 14,
        layoutPoints[from][1] + (layoutPoints[to][1] - layoutPoints[from][1]) * progress + Math.cos(index * 1.3 + hop) * 14,
      ]);
      connections.push([previous, next]);
      previous = next;
    }
    connections.push([previous, to]);
  });

  // Fill the open spaces with evenly separated nodes, keeping the layout organic.
  const targetNodeCount = 384;
  const targetConnectionCount = 804;
  const fillCandidates = Array.from({ length: 1200 }, (_, index) => {
    const point = [
      55 + ((index + 1) * .754877666 % 1) * 880,
      55 + ((index + 1) * .569840291 % 1) * 535,
    ];
    let distance = Infinity;
    let nearest = 0;
    layoutPoints.forEach(([x, y], node) => {
      const gap = Math.hypot(point[0] - x, point[1] - y);
      if (gap < distance) { distance = gap; nearest = node; }
    });
    return { point, distance, nearest };
  });
  while (layoutPoints.length < targetNodeCount) {
    const next = fillCandidates.reduce((best, candidate) => candidate.distance > best.distance ? candidate : best);
    const node = layoutPoints.length;
    layoutPoints.push(next.point);
    connections.push([next.nearest, node]);
    fillCandidates.forEach(candidate => {
      const gap = Math.hypot(candidate.point[0] - next.point[0], candidate.point[1] - next.point[1]);
      if (gap < candidate.distance) { candidate.distance = gap; candidate.nearest = node; }
    });
  }

  // Short cross-links form a dense mesh without introducing long jumps.
  const degrees = layoutPoints.map(() => 0);
  connections.forEach(([a, b]) => { degrees[a] += 1; degrees[b] += 1; });
  const candidates = [];
  layoutPoints.forEach(([x, y], from) => {
    layoutPoints.slice(from + 1).forEach(([otherX, otherY], offset) => {
      const to = from + offset + 1;
      const distance = Math.hypot(otherX - x, otherY - y);
      if (distance < 20 || distance > 105) return;
      if (connections.some(([a, b]) => (a === from && b === to) || (a === to && b === from))) return;
      candidates.push({ from, to, distance });
    });
  });
  candidates.sort((a, b) => a.distance - b.distance).forEach(({ from, to }) => {
    if (connections.length >= targetConnectionCount || degrees[from] >= 6 || degrees[to] >= 6) return;
    connections.push([from, to]);
    degrees[from] += 1;
    degrees[to] += 1;
  });

  const points = layoutPoints.map(point => [...point]);
  const adjacency = points.map(() => []);

  function element(tag, attributes, parent = svg) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    parent.appendChild(node);
    return node;
  }

  const edges = connections.map(([from, to], index) => {
    adjacency[from].push({ node: to, edge: index });
    adjacency[to].push({ node: from, edge: index });
    return element('line', {
      x1: points[from][0], y1: points[from][1],
      x2: points[to][0], y2: points[to][1], class: 'network-edge',
    });
  });
  const traces = connections.map(() => element('line', { class: 'network-trace' }));
  const halos = points.map(([cx, cy]) => element('circle', { cx, cy, r: 8, class: 'network-halo' }));
  const nodes = points.map(([cx, cy]) => element('circle', { cx, cy, r: 2.5, class: 'network-node' }));
  const tails = Array.from({ length: 7 }, (_, index) => element('circle', {
    r: 1.8 - index * .16, class: 'network-tail', opacity: 0,
  }));
  const spark = element('g', { class: 'network-spark' });
  element('path', { d: 'M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4 Z' }, spark);
  element('circle', { r: 1.8 }, spark);

  // Stop at the destination, then unwind the successful route to its start.
  function depthFirstSearch(root, goal, seed) {
    const visited = new Set([root]);
    const steps = [];
    let state = seed;
    function random() {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    }
    function visit(from) {
      if (from === goal) return true;
      const neighbors = [...adjacency[from]];
      // Stable shuffling gives each pair its own exploration order at every size.
      for (let index = neighbors.length - 1; index > 0; index -= 1) {
        const other = Math.floor(random() * (index + 1));
        [neighbors[index], neighbors[other]] = [neighbors[other], neighbors[index]];
      }
      for (const { node: to, edge } of neighbors) {
        if (visited.has(to)) continue;
        visited.add(to);
        steps.push({ from, to, edge, returning: false, found: to === goal });
        const found = visit(to);
        steps.push({ from: to, to: from, edge, returning: true, unwinding: found });
        if (found) return true;
      }
      return false;
    }
    visit(root);
    return steps;
  }

  // Start along the open lower-left edge, then search toward the upper right.
  // Each pair includes dead-end branches before reaching its destination.
  const searches = [
    { start: 100, end: 6, seed: 1231 },
    { start: 316, end: 287, seed: 1479 },
    { start: 131, end: 156, seed: 1429 },
    { start: 353, end: 296, seed: 4489 },
    { start: 104, end: 53, seed: 7752 },
    { start: 150, end: 296, seed: 6728 },
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cycle = 0;
  let walk;
  let stepIndex;
  let step;
  let distance;
  let travelTime;
  let elapsed = 0;
  let arrived = false;
  let pulsingNode = null;
  let frameId = null;
  let lastTime = null;
  let visible = !('IntersectionObserver' in window);

  function pulse(index) {
    if (pulsingNode !== null) halos[pulsingNode].classList.remove('is-pulsing');
    nodes[index].classList.add('is-visited');
    halos[index].classList.add('is-pulsing');
    pulsingNode = index;
  }

  function beginStep() {
    step = walk[stepIndex];
    arrived = false;
    const [x1, y1] = points[step.returning ? step.to : step.from];
    const [x2, y2] = points[step.returning ? step.from : step.to];
    distance = Math.hypot(x2 - x1, y2 - y1);
    travelTime = Math.max(270, Math.min(490, distance * 4.5));
    const trace = traces[step.edge];
    Object.entries({ x1, y1, x2, y2, 'stroke-dasharray': distance }).forEach(([name, value]) => trace.setAttribute(name, value));
    trace.classList.add('is-route');
    trace.classList.toggle('is-backtracking', step.returning);
    draw(0);
  }

  function draw(progress) {
    const [x1, y1] = points[step.from];
    const [x2, y2] = points[step.to];
    const x = x1 + (x2 - x1) * progress;
    const y = y1 + (y2 - y1) * progress;
    spark.setAttribute('transform', `translate(${x} ${y})`);
    spark.setAttribute('opacity', step.returning ? .7 : 1);
    traces[step.edge].setAttribute('stroke-dashoffset', distance * (step.returning ? progress : 1 - progress));
    tails.forEach((tail, index) => {
      const behind = progress - (index + 1) * Math.min(5, distance / 14) / distance;
      tail.setAttribute('cx', x1 + (x2 - x1) * Math.max(0, behind));
      tail.setAttribute('cy', y1 + (y2 - y1) * Math.max(0, behind));
      tail.setAttribute('opacity', behind < 0 ? 0 : (1 - index / tails.length) * (step.returning ? .28 : .55));
    });
  }

  function reset() {
    edges.forEach(edge => edge.classList.remove('is-visited'));
    nodes.forEach(node => node.classList.remove('is-visited'));
    traces.forEach(trace => trace.classList.remove('is-route', 'is-backtracking'));
    const { start, end, seed } = searches[cycle % searches.length];
    walk = depthFirstSearch(start, end, seed);
    stepIndex = 0;
    elapsed = 0;
    pulse(start);
    beginStep();
  }

  function animate(time) {
    if (lastTime !== null) elapsed += Math.min(time - lastTime, 80);
    lastTime = time;
    if (stepIndex === walk.length) {
      if (elapsed >= 800) { cycle += 1; reset(); }
    } else {
      const progress = Math.min(elapsed / travelTime, 1);
      draw(progress * progress * (3 - 2 * progress));
      if (progress === 1 && !arrived) {
        arrived = true;
        edges[step.edge].classList.toggle('is-visited', !step.returning);
        if (step.returning) nodes[step.from].classList.remove('is-visited');
        pulse(step.to);
        if (step.returning) traces[step.edge].classList.remove('is-route', 'is-backtracking');
      }
      const pause = step.found ? 900 : 75;
      if (elapsed >= travelTime + pause) {
        elapsed = 0;
        stepIndex += 1;
        if (stepIndex < walk.length) beginStep();
        else {
          nodes[step.to].classList.remove('is-visited');
          halos[step.to].classList.remove('is-pulsing');
          spark.setAttribute('opacity', 0);
          tails.forEach(tail => tail.setAttribute('opacity', 0));
        }
      }
    }
    frameId = window.requestAnimationFrame(animate);
  }

  function syncMotion() {
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = null;
    if (!reducedMotion.matches && !document.hidden && visible) {
      frameId = window.requestAnimationFrame(animate);
    }
  }

  let layoutWidth = 0;
  let layoutHeight = 0;
  function fitNetwork() {
    const { width, height } = svg.getBoundingClientRect();
    if (!width || !height || (width === layoutWidth && height === layoutHeight)) return;
    layoutWidth = width;
    layoutHeight = height;
    const inset = Math.min(30, width / 8, height / 8);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    layoutPoints.forEach(([x, y], index) => {
      points[index] = [
        inset + x / 960 * (width - inset * 2),
        inset + y / 640 * (height - inset * 2),
      ];
      [nodes[index], halos[index]].forEach(node => {
        node.setAttribute('cx', points[index][0]);
        node.setAttribute('cy', points[index][1]);
      });
    });
    connections.forEach(([from, to], index) => {
      Object.entries({
        x1: points[from][0], y1: points[from][1],
        x2: points[to][0], y2: points[to][1],
      }).forEach(([name, value]) => edges[index].setAttribute(name, value));
    });
    reset();
    syncMotion();
  }

  reset();
  fitNetwork();
  if ('ResizeObserver' in window) new ResizeObserver(fitNetwork).observe(svg);
  else window.addEventListener('resize', fitNetwork);
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0 }).observe(svg.closest('.hero-section'));
  }
  syncMotion();
})();
