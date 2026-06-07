  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S7NHVQVQ2V');


const places = {
  drury: {
    title: "Drury",
    copy:
      "A major future growth area that could eventually house around 60,000 new residents, increasing pressure on nearby streams, wetlands, and habitat corridors.",
    pressure: "Future housing growth and transport infrastructure",
    risk: "Habitat fragmentation, sediment runoff, and wetland pressure",
  },
  papakura: {
    title: "Papakura",
    copy:
      "A fast-changing community where local restoration groups are working to strengthen parks, stream edges, and everyday neighbourhood green spaces.",
    pressure: "Intensification, roads, and reduced tree cover",
    risk: "Urban heat, lower canopy, and pressure on waterways",
  },
  takanini: {
    title: "Takanini",
    copy:
      "A growth corridor where housing, retail, and transport expansion need to be balanced with ecological connections and water-sensitive design.",
    pressure: "Large-scale development and expanding hard surfaces",
    risk: "Runoff, flooding pressure, and fragmented habitat patches",
  },
  manukau: {
    title: "Manukau",
    copy:
      "A major urban centre connected to the Manukau Harbour catchment, where dense development makes shade, tree cover, and green corridors especially important.",
    pressure: "Commercial growth, roads, and limited urban canopy",
    risk: "Heat, stormwater pressure, and reduced native vegetation connectivity",
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count);
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        number.textContent =
          target >= 1000 ? current.toLocaleString("en-NZ") : current;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(number);
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll("[data-count]").forEach((number) => {
  countObserver.observe(number);
});

const placePanel = document.querySelector("#place-panel");
const pins = document.querySelectorAll(".map-pin");
const mapSurface = document.querySelector(".map-surface");

const resetPlacePanel = () => {
  pins.forEach((item) => item.classList.remove("active"));
  placePanel.innerHTML = `
    <p class="kicker">Select a location</p>
    <h3>Click on a place to learn more</h3>
    <p>
      Select one of the locations on the map to see the development pressure and environmental risk connected to vegetation decline in that area.
    </p>
  `;
};

pins.forEach((pin) => {
  pin.addEventListener("click", (e) => {
    e.stopPropagation();
    const place = places[pin.dataset.place];

    pins.forEach((item) => item.classList.remove("active"));
    pin.classList.add("active");

    placePanel.innerHTML = `
      <p class="kicker">Selected area</p>
      <h3>${place.title}</h3>
      <p>${place.copy}</p>
      <dl>
        <div>
          <dt>Pressure</dt>
          <dd>${place.pressure}</dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>${place.risk}</dd>
        </div>
      </dl>
    `;
  });
});

if (mapSurface) {
  mapSurface.addEventListener("click", () => {
    resetPlacePanel();
  });
}

document.querySelectorAll(".impact-card").forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!expanded));
  });
});

// Before/After Slider
const slider = document.getElementById("beforeAfterSlider");
const sliderHandle = document.getElementById("sliderHandle");
const sliderLine = document.getElementById("sliderLine");
const afterImageWrapper = document.querySelector(".after-image-wrapper");

if (slider && sliderHandle && sliderLine && afterImageWrapper) {
  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;

    sliderHandle.style.left = `${percentage}%`;
    sliderLine.style.left = `${percentage}%`;
    afterImageWrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  };

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.touches[0].clientX);
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });
}

// Interview Tabs
const interviewTabs = document.querySelectorAll(".interview-tab");
const interviewPanels = document.querySelectorAll(".interview-panel");

interviewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.dataset.tab;

    interviewTabs.forEach((t) => t.classList.remove("active"));
    interviewPanels.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});
