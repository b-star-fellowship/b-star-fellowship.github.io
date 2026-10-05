(() => {
  const svg = document.querySelector('[data-neural-network]');
  if (!svg) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const searches = [
    { start: [.06, .24], end: [.94, .72] },
    { start: [.91, .83], end: [.08, .17] },
    { start: [.87, .12], end: [.12, .85] },
    { start: [.08, .68], end: [.92, .3] },
    { start: [.35, .88], end: [.72, .08] },
    { start: [.76, .18], end: [.2, .9] },
  ];
  let points = [];
  let adjacency = [];
  let routeNodes = [];
  let traveler;
  let layoutWidth = 0;
  let layoutHeight = 0;
  let frameId = null;
  let lastTime = null;

  function element(tag, attributes, parent = svg) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    parent.appendChild(node);
    return node;
  }

  // Stable, staggered points continue beyond every edge of the viewport.
  function noise(index) {
    const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }

  // Explore shuffled branches without steering toward the goal. Exhausted branches
  // backtrack during the search; reaching the goal finally unwinds the whole route.
  function depthFirstSearch(root, goal, seed, graph = adjacency) {
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
      const neighbors = [...graph[from]];
      for (let index = neighbors.length - 1; index > 0; index -= 1) {
        const other = Math.floor(random() * (index + 1));
        [neighbors[index], neighbors[other]] = [neighbors[other], neighbors[index]];
      }
      for (const to of neighbors) {
        if (visited.has(to)) continue;
        visited.add(to);
        steps.push({ from, to, returning: false, found: to === goal });
        const found = visit(to);
        steps.push({ from: to, to: from, returning: true, unwinding: found });
        if (found) return true;
      }
      return false;
    }
    visit(root);
    return steps;
  }

  function exploratorySearch(start, end, seed, graph = adjacency) {
    let bestWalk;
    let bestScore = Infinity;
    // Choose a genuine DFS ordering with visible dead ends early in the search.
    // A dense mesh can otherwise reach its goal before ever needing to retreat.
    for (let attempt = 0; attempt < 64; attempt += 1) {
      const walk = depthFirstSearch(start, end, seed + attempt * 1479, graph);
      const exploration = walk.slice(0, walk.findIndex(step => step.found));
      const firstReturn = exploration.findIndex(step => step.returning);
      const returns = exploration.filter(step => step.returning).length;
      const multiHopReturn = exploration.some((step, index) => step.returning && exploration[index + 1]?.returning);
      const score = (firstReturn < 0 ? 1000 : firstReturn) + exploration.length / 24 +
        (returns < 4 ? 1000 : 0) + (multiHopReturn ? 0 : 1000);
      if (score < bestScore) { bestScore = score; bestWalk = walk; }
    }
    return bestWalk;
  }

  function nearest([x, y], excluded = [], allowedNodes = routeNodes) {
    const target = [x * layoutWidth, y * layoutHeight];
    const candidates = allowedNodes.filter(node => !excluded.includes(node));
    return candidates.reduce((best, index) =>
      Math.hypot(points[index][0] - target[0], points[index][1] - target[1]) <
      Math.hypot(points[best][0] - target[0], points[best][1] - target[1]) ? index : best, candidates[0]);
  }

  function largestComponent(graph) {
    let largest = [];
    const seen = new Set();
    graph.forEach((neighbors, root) => {
      if (!neighbors.length || seen.has(root)) return;
      const component = [];
      const pending = [root];
      seen.add(root);
      while (pending.length) {
        const current = pending.pop();
        component.push(current);
        graph[current].forEach(node => {
          if (!seen.has(node)) { seen.add(node); pending.push(node); }
        });
      }
      if (component.length > largest.length) largest = component;
    });
    return largest;
  }

  function crossesRect([x, y], [otherX, otherY], rect) {
    let near = 0;
    let far = 1;
    for (const [origin, delta, low, high] of [
      [x, otherX - x, rect.left, rect.right],
      [y, otherY - y, rect.top, rect.bottom],
    ]) {
      if (delta === 0) {
        if (origin < low || origin > high) return false;
      } else {
        const first = (low - origin) / delta;
        const second = (high - origin) / delta;
        near = Math.max(near, Math.min(first, second));
        far = Math.min(far, Math.max(first, second));
        if (near > far) return false;
      }
    }
    return true;
  }

  function openingSearch() {
    const hero = document.querySelector('.hero-section');
    const field = svg.getBoundingClientRect();
    const bounds = hero.getBoundingClientRect();
    const title = document.createRange();
    title.selectNodeContents(hero.querySelector('h1'));
    const copyRects = [
      ...title.getClientRects(),
      ...Array.from(hero.querySelectorAll('.hero-description, .hero-actions > *'), node => node.getBoundingClientRect()),
    ].map(rect => ({
      left: rect.left - field.left - 24, right: rect.right - field.left + 24,
      top: rect.top - field.top - 24, bottom: rect.bottom - field.top + 24,
    }));
    const top = Math.max(12, bounds.top - field.top + 20);
    const bottom = Math.min(layoutHeight - 12, bounds.bottom - field.top - 20);
    const open = points.map(([x, y]) =>
      x >= (layoutWidth < 640 ? 12 : layoutWidth * .45) && y >= top && y <= bottom);
    // Only the opening search avoids the copy, including whole diagonal segments.
    const graph = adjacency.map((neighbors, from) => neighbors.filter(to =>
      open[from] && open[to] && !copyRects.some(rect => crossesRect(points[from], points[to], rect))));
    const nodes = largestComponent(graph);
    return { graph, nodes, start: [.84, (top + (bottom - top) * .65) / layoutHeight], end: [.6, top / layoutHeight] };
  }

  function beginStep(traveler) {
    const step = traveler.walk[traveler.stepIndex];
    traveler.from = points[step.from];
    traveler.to = points[step.to];
    traveler.distance = Math.hypot(traveler.to[0] - traveler.from[0], traveler.to[1] - traveler.from[1]);
    traveler.returning = step.returning;
    traveler.progress = 0;
    // Keep every completed hop; backtracking shortens only the final segment.
    const route = step.returning ? traveler.route.slice(0, -1) : traveler.route;
    traveler.pathPrefix = route.map((node, index) => `${index ? 'L' : 'M'}${points[node].join(' ')}`).join(' ');
  }

  function reset(traveler) {
    const search = searches[traveler.cycle % searches.length];
    const opening = traveler.cycle === 0 ? openingSearch() : null;
    const allowedNodes = opening ? opening.nodes : routeNodes;
    // On a viewport without open hero space, wait for the next layout change.
    if (allowedNodes.length < 2) { traveler.walk = []; return; }
    // Once the previous route has fully unwound, start a different search.
    const previousStart = traveler.walk?.[0]?.from;
    const previousEnd = traveler.walk?.find(step => step.found)?.to;
    const start = nearest(opening?.start ?? search.start, [previousStart], allowedNodes);
    const end = nearest(opening?.end ?? search.end, [start, previousEnd], allowedNodes);
    const seed = 1 + Math.floor(Math.random() * 2147483646);
    traveler.walk = exploratorySearch(start, end, seed, opening?.graph ?? adjacency);
    traveler.stepIndex = 0;
    traveler.route = [start];
    beginStep(traveler);
  }

  function draw(traveler) {
    const progress = traveler.progress / traveler.distance;
    const [x1, y1] = traveler.from;
    const [x2, y2] = traveler.to;
    const x = x1 + (x2 - x1) * progress;
    const y = y1 + (y2 - y1) * progress;
    traveler.spark.setAttribute('transform', `translate(${x} ${y})`);
    traveler.trace.setAttribute('d', `${traveler.pathPrefix} L${x} ${y}`);
  }

  function animate(time) {
    const delta = lastTime === null ? 0 : Math.min(time - lastTime, 64);
    lastTime = time;
    if (traveler.pause > 0) {
      traveler.pause = Math.max(0, traveler.pause - delta);
    } else {
      let movement = delta / 1000 * traveler.speed;
      // Carry excess distance into the next hop for continuous, constant-speed motion.
      while (movement >= traveler.distance - traveler.progress) {
        movement -= traveler.distance - traveler.progress;
        const completed = traveler.walk[traveler.stepIndex];
        if (completed.returning) traveler.route.pop();
        else traveler.route.push(completed.to);
        traveler.stepIndex += 1;
        if (traveler.stepIndex === traveler.walk.length) {
          traveler.cycle += 1;
          reset(traveler);
        } else beginStep(traveler);
        const next = traveler.walk[traveler.stepIndex];
        const deadEnd = !completed.returning && next.returning && !next.unwinding;
        if (completed.found || deadEnd) {
          // A brief hesitation makes a dead-end reversal readable at this speed.
          traveler.pause = completed.found ? 600 : 140;
          movement = 0;
          break;
        }
      }
      traveler.progress += movement;
      draw(traveler);
    }
    frameId = window.requestAnimationFrame(animate);
  }

  function syncMotion() {
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = null;
    if (traveler?.walk.length && !reducedMotion.matches && !document.hidden) {
      frameId = window.requestAnimationFrame(animate);
    }
  }

  function fitNetwork() {
    const { width, height } = svg.getBoundingClientRect();
    if (!width || !height || (width === layoutWidth && height === layoutHeight)) return;
    layoutWidth = width;
    layoutHeight = height;
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const spacing = width < 640 ? 48 : 58;
    const columns = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;
    const connections = [];
    points = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const index = points.length;
        const seed = row * 4096 + col;
        points.push([
          (col - .5 + (row % 2) * .5 + (noise(seed) - .5) * .8) * spacing,
          (row - .5 + (noise(seed + 9127) - .5) * .8) * spacing,
        ]);
        if (col > 0) connections.push([index - 1, index]);
        if (row > 0) {
          connections.push([index - columns, index]);
          const diagonal = col + (row % 2 ? 1 : -1);
          if (diagonal >= 0 && diagonal < columns && noise(seed + 71) > .3) {
            connections.push([(row - 1) * columns + diagonal, index]);
          }
        }
      }
    }

    adjacency = points.map(() => []);
    const onScreen = points.map(([x, y]) => x >= 12 && x <= width - 12 && y >= 12 && y <= height - 12);
    connections.forEach(([from, to]) => {
      // The mesh bleeds offscreen; the traversal stays visible, including retreats.
      if (onScreen[from] && onScreen[to]) {
        adjacency[from].push(to);
        adjacency[to].push(from);
      }
      element('line', {
        x1: points[from][0], y1: points[from][1],
        x2: points[to][0], y2: points[to][1], class: 'network-edge',
      });
    });
    points.forEach(([cx, cy]) => element('circle', { cx, cy, r: 2, class: 'network-node' }));
    routeNodes = largestComponent(adjacency);
    if (routeNodes.length < 2) { traveler = null; return; }
    const motion = element('g', { class: 'network-motion' });
    const trace = element('path', { class: 'network-trace', opacity: .3 }, motion);
    const spark = element('g', { class: 'network-spark', visibility: 'hidden' }, motion);
    element('path', { d: 'M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z' }, spark);
    traveler = { cycle: traveler?.cycle ?? 0, pause: 0, trace, spark, speed: width < 640 ? 70 : 90 };
    reset(traveler);
    if (traveler.walk.length) {
      spark.removeAttribute('visibility');
      draw(traveler);
    }
    syncMotion();
  }

  fitNetwork();
  if ('ResizeObserver' in window) new ResizeObserver(fitNetwork).observe(svg);
  else window.addEventListener('resize', fitNetwork);
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
})();
