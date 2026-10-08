(function () {
  "use strict";

  var steps = [
    { n: 1, label: "Open", text: "Read goal.md and both memory files. Create missing runtime files from templates. Check the host project read-only." },
    { n: 2, label: "Diagnose", text: "State the gap between current and goal state. Visualize first, then layered statistics, then model checks. List competing hypotheses with falsifiers." },
    { n: 3, label: "Blind check", text: "For complex or conflicting problems, the blank-context evaluator rebuilds the phenomenon from raw artifacts alone." },
    { n: 4, label: "Brainstorm", text: "Record expected gain, coordination cost, and risk before decomposition. If parallel wins, isolated blank-context agents fill every usable slot; merge raw results by evidence, preserve dissent, and test the cheapest critical assumption first." },
    { n: 5, label: "Evidence", text: "The web-research agent searches answer-first, then BFS, weaker subproblems, leading-route DFS, failure questions, and trends." },
    { n: 6, label: "Implement", text: "Smallest verifiable step. Leave artifacts and a reproducible entry point." },
    { n: 7, label: "Evaluate", text: "The evaluator checks the gate record, raw and merged artifacts, and done criteria with a blank context; it blocks a stop while any blocker remains." },
    { n: 8, label: "Iterate", text: "Blockers return to diagnosis. A local patch is not a fix." },
    { n: 9, label: "Close", text: "Stop only when every done criterion is met with evidence, memory is reviewed, and no higher-value action remains." }
  ];

  var svg = document.querySelector(".loop-nodes");
  var status = document.getElementById("loop-status");
  if (!svg || !status) return;

  var svgEl = document.querySelector(".loop");
  if (svgEl && window.innerWidth <= 720) {
    svgEl.setAttribute("viewBox", "-60 -10 840 740");
  }

  var cx = 360, cy = 360, r = 232;
  var groups = [];

  steps.forEach(function (step, i) {
    var angle = (-90 + i * 40) * Math.PI / 180;
    var x = cx + r * Math.cos(angle);
    var y = cy + r * Math.sin(angle);
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var lx, ly, anchor;

    if (cos > 0.45) {
      anchor = "start";
      lx = x + 34;
      ly = y + 6;
    } else if (cos < -0.45) {
      anchor = "end";
      lx = x - 34;
      ly = y + 6;
    } else {
      anchor = "middle";
      lx = x;
      ly = y + (sin < 0 ? -40 : 48);
    }

    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "node");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", "Step " + step.n + ": " + step.label);
    g.dataset.index = String(i);

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "27");

    var num = document.createElementNS("http://www.w3.org/2000/svg", "text");
    num.setAttribute("class", "node-num");
    num.setAttribute("x", x);
    num.setAttribute("y", y);
    num.textContent = String(step.n);

    var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", lx);
    label.setAttribute("y", ly);
    label.setAttribute("text-anchor", anchor);
    label.textContent = step.label;

    g.appendChild(circle);
    g.appendChild(num);
    g.appendChild(label);
    svg.appendChild(g);
    groups.push(g);

    function activate() { setActive(i, true); }
    g.addEventListener("click", activate);
    g.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  var activeIndex = -1;
  var userControlled = false;
  var timer = null;

  function setActive(index, fromUser) {
    groups.forEach(function (g, i) {
      g.classList.toggle("is-active", i === index);
    });
    activeIndex = index;
    var step = steps[index];
    status.textContent = "Step " + step.n + " · " + step.label + " — " + step.text;
    if (fromUser) {
      userControlled = true;
      if (timer) { clearInterval(timer); timer = null; }
    }
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setActive(1, false);

  if (!reduce) {
    timer = setInterval(function () {
      if (userControlled) return;
      setActive((activeIndex + 1) % steps.length, false);
    }, 2600);
  }
})();
