/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let navSectionsCount = 0;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @param {number} sectionNumber: the number of the section that we are creating now
 * @description create the content of the section element which will add to the main element
 * @returns {string} represend the html of the section as string
 */
function createNewSectionContent(sectionNumber) {
  return `<div class="landing__container">
  <h2>Section ${sectionNumber}</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
    fermentum metus faucibus lectus pharetra dapibus. Suspendisse
    potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
    lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
    convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
    eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
    nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
    lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
    tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
    vitae elit. Integer nec libero venenatis libero ultricies molestie
    semper in tellus. Sed congue et odio sed euismod.
  </p>

  <p>
    Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
    gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
    Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
    consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
    elementum tortor mollis non.
  </p>
</div>`;
}

/**
 * @param {number} sectionNumber: the number of the section that we are creating now
 * @description create the section element which will add to the main element
 * @returns {HTMLElement} represend the created section
 */
function createNewSection(sectionNumber) {
  const mainElement = document.querySelector("main");

  const newSection = document.createElement("section");

  newSection.id = `Section${sectionNumber}`;
  newSection.dataset.nav = `Section ${sectionNumber}`;
  newSection.innerHTML = createNewSectionContent(sectionNumber);

  mainElement.appendChild(newSection);

  return newSection;
}

/**
 * @param {HTMLElement} navSection: the section that li elements will point to.
 * @description create li element to be used in the navigation menu
 * @returns {HTMLElement} liElement: li element with its properties
 */
function createLiElement(navSection) {
  const aElement = document.createElement("a");
  const liElement = document.createElement("li");

  aElement.addEventListener("click", () => {
    navSection.scrollIntoView({ behavior: "smooth" });
  });

  aElement.setAttribute("class", "menu__link");
  aElement.innerText = navSection.getAttribute("data-nav");

  liElement.appendChild(aElement);

  return liElement;
}

/**
 * @description build the nav component with it's content
 */
function builldNavComponent() {
  const navMenu = document.querySelector("#navbar__list");
  const fragmentObj = document.createDocumentFragment();
  const navSectionsList = document.querySelectorAll("section");

  // build the nav component form the sections that are already existing on the html
  navSectionsList.forEach((navSection) => {
    navSectionsCount++;
    fragmentObj.appendChild(createLiElement(navSection));
  });

  // if the html contains less than 4 section, we will build the rest until 4 (section in the page, li in the nav component)
  if (navSectionsList.length < 4) {
    for (let i = 0; i < 4 - navSectionsList.length; i++) {
      navSectionsCount++;
      newSection = createNewSection(navSectionsCount);
      fragmentObj.appendChild(createLiElement(newSection));
    }
  }

  // add the nav component as child to the ul with the id = "navbar__list"
  navMenu.appendChild(fragmentObj);
}

/**
 * @param {HTMLElement} element: the element that we will check if it is existing on the Viewport now
 * @description check if it is existing on the Viewport now
 * @returns {boolean} liElement: li element with its properties
 */
function isElementInViewport(element) {
  const currentBound = element.getBoundingClientRect();
  return (
    currentBound.top >= 0 &&
    currentBound.left >= 0 &&
    currentBound.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    currentBound.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * @description set the active class to the current section which is in the view port
 */
function setActiveSection() {
  const navSectionsList = document.querySelectorAll("section");
  const navAElementList = document.querySelectorAll(".menu__link");

  // loop on all the sections in the page
  navSectionsList.forEach((navSection, index) => {
    // detect if the current section are in the view port, if false, remove the activeSection class from it, because it is now not in the view port
    if (!isElementInViewport(navSection)) {
      navSection.classList.remove("activeSection");
      navAElementList[index].classList.remove("activeSection");
    }
    // if true, add the activeSection class from it, because it is now in the view port
    else {
      navSection.classList.add("activeSection");
      navAElementList[index].classList.add("activeSection");
    }
  });
}

/**
 * @description add new section to the page, and add new li to the nav component
 */
function addNewSection() {
  const navMenu = document.querySelector("#navbar__list");

  navSectionsCount++;

  // create the section and the section content on the page
  newSection = createNewSection(navSectionsCount);

  // create li elements in the nav and link the section to them
  navMenu.appendChild(createLiElement(newSection));
}

// build the nav component
builldNavComponent();

// add event listener on the scroll, to detect the current section on the viewport and set activeSection class to it.
document.addEventListener("scroll", setActiveSection);
