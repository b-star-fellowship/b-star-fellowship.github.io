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
    const middle = layoutPoints.length;
    layoutPoints.push([
      (layoutPoints[from][0] + layoutPoints[to][0]) / 2 + Math.sin(index * 1.9) * 9,
      (layoutPoints[from][1] + layoutPoints[to][1]) / 2 + Math.cos(index * 1.3) * 9,
    ]);
    connections.push([from, middle], [middle, to]);
  });

  // A few short cross-links create a mesh while retaining the branch tips.
  const degrees = layoutPoints.map(() => 0);
  connections.forEach(([a, b]) => { degrees[a] += 1; degrees[b] += 1; });
  const candidates = [];
  layoutPoints.forEach(([x, y], from) => {
    layoutPoints.slice(from + 1).forEach(([otherX, otherY], offset) => {
      const to = from + offset + 1;
      const distance = Math.hypot(otherX - x, otherY - y);
      if (distance < 45 || distance > 105 || degrees[from] === 1 || degrees[to] === 1) return;
      if (connections.some(([a, b]) => (a === from && b === to) || (a === to && b === from))) return;
      candidates.push({ from, to, distance });
    });
  });
  let crossLinks = 0;
  candidates.sort((a, b) => a.distance - b.distance).forEach(({ from, to }) => {
    if (crossLinks >= 12 || degrees[from] >= 4 || degrees[to] >= 4) return;
    connections.push([from, to]);
    degrees[from] += 1;
    degrees[to] += 1;
    crossLinks += 1;
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

  // Every discovery descends one edge; every return retraces that same edge.
  function depthFirstWalk(root) {
    const visited = new Set([root]);
    const steps = [];
    function visit(from) {
      const neighbors = [...adjacency[from]].sort((a, b) => points[b.node][0] - points[a.node][0]);
      neighbors.forEach(({ node: to, edge }) => {
        if (visited.has(to)) return;
        visited.add(to);
        steps.push({ from, to, edge, returning: false });
        visit(to);
        steps.push({ from: to, to: from, edge, returning: true });
      });
    }
    visit(root);
    return steps;
  }

  const roots = [4, 11, 15, 2];
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
    travelTime = Math.max(360, Math.min(650, distance * 6));
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
    const root = roots[cycle % roots.length];
    walk = depthFirstWalk(root);
    stepIndex = 0;
    elapsed = 0;
    pulse(root);
    beginStep();
  }

  function animate(time) {
    if (lastTime !== null) elapsed += Math.min(time - lastTime, 80);
    lastTime = time;
    if (stepIndex === walk.length) {
      if (elapsed >= 1200) { cycle += 1; reset(); }
    } else {
      const progress = Math.min(elapsed / travelTime, 1);
      draw(progress * progress * (3 - 2 * progress));
      if (progress === 1 && !arrived) {
        arrived = true;
        edges[step.edge].classList.add('is-visited');
        pulse(step.to);
        if (step.returning) traces[step.edge].classList.remove('is-route', 'is-backtracking');
      }
      if (elapsed >= travelTime + 100) {
        elapsed = 0;
        stepIndex += 1;
        if (stepIndex < walk.length) beginStep();
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
