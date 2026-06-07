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

// Timeline Slider
const timelineData = [
  { year: 1985, vegetation: 90.0, description: "Peak pastoral farming; early construction of the southern motorway.", image: "Images/Timeline/1985.png" },
  { year: 1990, vegetation: 88.5, description: "Gradual rural-residential sub-division expansion.", image: "Images/Timeline/1990.png" },
  { year: 1995, vegetation: 86.0, description: "Opening of major industrial parks in Wiri and East Tāmaki.", image: "Images/Timeline/1995.png" },
  { year: 2000, vegetation: 83.5, description: "Intensifying housing growth in Manukau City and Papakura.", image: "Images/Timeline/2000.png" },
  { year: 2005, vegetation: 81.0, description: "Expansion of greenfield developments into Flat Bush and Takanini.", image: "Images/Timeline/2005.png" },
  { year: 2010, vegetation: 78.5, description: "Loss of fertile market gardens in Māngere to industrial storage.", image: "Images/Timeline/2010.png" },
  { year: 2015, vegetation: 75.0, description: "Accelerated expansion southward toward Drury and Pukekohe.", image: "Images/Timeline/2015.png" },
  { year: 2020, vegetation: 72.0, description: "Massive loss of rural green space to high-density housing.", image: "Images/Timeline/2020.png" }
];

const timelineSlider = document.getElementById("timelineSlider");
const timelineImage = document.getElementById("timelineImage");
const progressFill = document.getElementById("progressFill");
const yearLabel = document.getElementById("yearLabel");
const vegetationPercent = document.getElementById("vegetationPercent");
const yearDescription = document.getElementById("yearDescription");

if (timelineSlider) {
  const updateTimeline = (index) => {
    const data = timelineData[index];
    const progress = (index / (timelineData.length - 1)) * 100;

    timelineImage.src = data.image;
    progressFill.style.width = `${progress}%`;

    yearLabel.classList.add("fade-out");
    vegetationPercent.classList.add("fade-out");
    yearDescription.classList.add("fade-out");

    setTimeout(() => {
      yearLabel.textContent = data.year;
      vegetationPercent.textContent = `${data.vegetation}% vegetation`;
      yearDescription.textContent = data.description;

      yearLabel.classList.remove("fade-out");
      vegetationPercent.classList.remove("fade-out");
      yearDescription.classList.remove("fade-out");
    }, 300);
  };

  timelineSlider.addEventListener("input", (e) => {
    const index = parseInt(e.target.value);
    updateTimeline(index);
  });
}

// Cause → Impact Explorer
const causeData = {
  "land-clearance": {
    title: "Land clearance",
    mechanism: "Removal of native vegetation for human land use.",
    ecosystems: ["Forests", "Grasslands"],
    effects: ["Habitat loss", "Soil degradation", "Carbon release"],
    declineLevel: 80
  },
  "urban-expansion": {
    title: "Urban expansion",
    mechanism: "Replacement of vegetation with buildings and infrastructure.",
    ecosystems: ["Urban fringes", "Wetlands"],
    effects: ["Fragmentation", "Heat island effect", "Reduced biodiversity"],
    declineLevel: 75
  },
  "agriculture": {
    title: "Agriculture intensification",
    mechanism: "Conversion to monoculture farming reduces plant diversity.",
    ecosystems: ["Farmland edges", "Native grasslands"],
    effects: ["Soil depletion", "Pesticide impact", "Ecosystem simplification"],
    declineLevel: 65
  },
  "pollution": {
    title: "Pollution runoff",
    mechanism: "Chemicals and sediment enter ecosystems via water systems.",
    ecosystems: ["Rivers", "Wetlands", "Coastal vegetation"],
    effects: ["Plant toxicity", "Reduced growth", "Water quality decline"],
    declineLevel: 55
  },
  "infrastructure": {
    title: "Infrastructure development",
    mechanism: "Roads and utilities cut through natural vegetation areas.",
    ecosystems: ["Forest corridors", "Fragmented habitats"],
    effects: ["Isolation of species", "Disrupted migration", "Edge effects"],
    declineLevel: 60
  }
};

const causeButtons = document.querySelectorAll(".cause-button");
const impactContent = document.getElementById("impactContent");
const impactTitle = document.getElementById("impactTitle");
const impactMechanism = document.getElementById("impactMechanism");
const impactEcosystems = document.getElementById("impactEcosystems");
const impactEffects = document.getElementById("impactEffects");
const declineFill = document.getElementById("declineFill");

causeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cause = button.dataset.cause;
    const data = causeData[cause];

    causeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    impactContent.classList.add("fade-out");

    setTimeout(() => {
      impactTitle.textContent = data.title;
      impactMechanism.textContent = data.mechanism;

      impactEcosystems.innerHTML = data.ecosystems
        .map((eco) => `<li>${eco}</li>`)
        .join("");

      impactEffects.innerHTML = data.effects
        .map((effect) => `<li>${effect}</li>`)
        .join("");

      declineFill.style.width = `${data.declineLevel}%`;

      impactContent.classList.remove("fade-out");
    }, 400);
  });
});

// Statistics Explorer
const statCards = document.querySelectorAll(".stat-card");

statCards.forEach((card) => {
  card.addEventListener("click", () => {
    statCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});


// Load Footer
fetch("footer.html")
  .then((response) => response.text())
  .then((html) => {
    const footerPlaceholder = document.createElement("div");
    footerPlaceholder.innerHTML = html;
    document.body.appendChild(footerPlaceholder);
  })
  .catch((error) => console.error("Error loading footer:", error));
 
