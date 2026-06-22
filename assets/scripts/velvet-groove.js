// Variables
    // GLOBAL VARIABLES
let ACTIVE = null;


    // FROM HTML
const navList = document.querySelector('.nav-list');
const navMenu = document.querySelector('.nav-menu');
const burgerBtn = document.querySelector('.burger-btn');
const exploreBtn = document.querySelector('.explore-button');
const joinBtn = document.querySelector('.join-button');
const mainContainer = document.querySelector('.main-container');
const navItems = document.querySelectorAll('.nav_link');


    // Event Listeners
burgerBtn.addEventListener('click', burgerNav);
exploreBtn.addEventListener('click', () => {
    changeHTML({target: document.getElementById('menu-nav')});
})
joinBtn.addEventListener('click', () => {
    changeHTML({target: document.getElementById('jobs-nav')});
})

navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        changeHTML(e);
        navMenu.classList.remove('nav-active');
    }
});

const blurHeader = () => {
    const header = document.querySelector('.header');
    this.scrollY > 50 ? header.classList.add('header-opacity')
    : header.classList.remove('header-opacity');
}

window.addEventListener('scroll', blurHeader);




// Functions
function burgerNav() {
    navMenu.classList.toggle('nav-active');
}

function changeHTML(e) {
    mainContainer.innerHTML = '';
    console.log(e.target);
    if (e.target.classList.contains('nav_link')) {
        switch (e.target.id) {
            case 'home-nav': 
                ACTIVE = 'home-nav';
                renderHomeHTML(); 
                break;
            case 'menu-nav': 
                ACTIVE = 'menu-nav';
                renderMenuHTML(); 
                break;
            case 'music-nav': 
                ACTIVE = 'music-nav';
                renderMusicHTML(); 
                initializeMusicPlayer();
                break;
            case 'jobs-nav': 
                ACTIVE = 'jobs-nav';
                renderJobsHTML(); 
                break;
            default: 
                ACTIVE = 'home-nav';
                renderHomeHTML(); 
                break;
        }
    }
}


function renderHomeHTML() {
    if (ACTIVE === 'home-nav') {
        mainContainer.innerHTML = `
        <section class="sec-container home-container grid home" id="home">
            <div class="glow-effect"> </div>
            <div class="home-info">
                <div class="home-text-info">
                    <div class="text-info">
                        <h2> The Velvet <span>Groove</span> </h2>
                        <p> A late-night sanctuary where the warmth of analog vinyl</p>
                        <p> meets the rich complexity of hand-crafted, slow-roasted coffee</p>
                    </div>
                    <div class="button-container">
                        <button class="button-primary explore-button" onClick='changeHTML({target: document.getElementById("menu-nav")})'>Explore Our Menu</button>
                        <button class="button-secondary join-button" onClick='changeHTML({target: document.getElementById("jobs-nav")})'>Join the Team</button>
                    </div>
                </div>
                <div class="vinyl">
                    <img src="assets/img/act1/vinyl.png">
                </div>         
            </div>
        </section>
        `;
    }
}

function renderMenuHTML() {
    if (ACTIVE === 'menu-nav') {
        mainContainer.innerHTML = `
        <section class="sec-container menu-container grid menu" id="menu">
            <div class="glow-effect"></div>
            <div class="menu-description">
                <h2> Our <span>Menu</span> </h2>
                <p> A curated selection of sensory experiences. Each sip and bite is <BR> crafted to sync with the rhythm of the room.</p>
            </div>
            <div class="menu-items">
                <div class="blends-container">
                    <h2> Signature Blends </h2>

                    <div class="order-item">
                        <div>
                            <h1>Mixtape Tablea Mocha</h1>
                            <p>A heavy, soulful blend of dark roasted espresso and thick, bitter-sweet tablea.</p>
                        </div>
                        <div class="price">
                            <p class="cost">P205.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>Inner Groove</h1>
                            <p>Bold, heavy, and unapologetically smoky blend that lingers long after the track ends.</p>
                        </div>
                        <div class="price">
                            <p class="cost">P195.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>The Reverb Cold Brew</h1>
                            <p>Smooth, low acidity, and hits you with a delayed caffeine wave that keeps you going all night.</p>
                        </div>
                        <div class="price">
                            <p class="cost">P190.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>Classic Latte</h1>
                            <p>Rich espresso cut with perfectly steamed milk and melted local muscovado sugar.</p>
                        </div>
                        <div class="price">
                            <p class="cost">P180.00</p>
                        </div>
                    </div>
                </div>

                <div class="pastries-container">
                    <h2>Handcrafted Pastries</h2>
                    <div class="order-item">
                        <div>
                            <h1>Groove Croissant</h3>
                            <p>A buttery, flaky croissant with a subtle, sweet choco glaze, dusted with cocoa.</p>
                        </div>
                        <div>
                            <p class="cost">P145.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>Midnight Cassette Brownies</h3>
                            <p>Dense, fudgy dark chocolate brownies infused with Benguet coffee grounds.</p>
                        </div>
                        <div>
                            <p class="cost">P125.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>The Sleeve (Sans Rival Slice)</h3>
                            <p>A sleek, rectangular cut of layered cashew meringue and rich French buttercream.</p>
                        </div>
                        <div>
                            <p class="cost">P195.00</p>
                        </div>
                    </div>

                    <div class="order-item">
                        <div>
                            <h1>Track 1: The Classic Empanada</h3>
                            <p>A flaky, buttery crust stuffed with savory chicken, potatoes, and raisins</p>
                        </div>
                        <div>
                            <p class="cost">P130.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}

function renderMusicHTML() {
    if (ACTIVE === 'music-nav') {
        mainContainer.innerHTML = `
            <section class="sec-container music-container grid music" id="music">
            <div class="glow-effect"></div>
            <div class="music-description">
                <p><span>NOW SPINNING</span></p>
                <h1 class='song-title'>Midnight </h1>
                <h2>Express-o Ritual</h2>
                <p>A curated journey through warm crackles and dusty samples. <br>Immerse yourself in the analog warmth of our house-blended soundscape</p>
            </div>
            <div class="music-player">
                 <div class="change-music">
                    <button class="music-icons disk select-state-active"><img src="assets/img/act2/icons/disc-fill.svg" alt=""></button> 
                    <button class="music-icons playlists"><img src="assets/img/act2/icons/play-list-fill.svg" alt=""></button>
                    
                </div>
                <hr>
                <div class="vinyl-record">
                    <img src="assets/img/act1/vinyl.png">
                </div>
                <div class="about-record">
                    <h4><span>Late Night Vibes</span></h4>
                    <p>The Velvet Groove</p>
                    <input type="range" class="progress-bar" min="0" max="100">
                </div>
                <div class="button-record">
                    <button class="music-icons stop"><img src="assets/img/act2/icons/stop-fill.svg" alt=""></button>
                    <button class="music-icons rewind"><img src="assets/img/act2/icons/rewind-fill.svg" alt=""></button>
                    <button class="music-icons play" id="play"><img src="assets/img/act2/icons/play-fill.svg" alt=""></button>
                    <button class="music-icons forward"><img src="assets/img/act2/icons/speed-fill.svg" alt=""></button>
                    <button class="music-icons loop"><img src="assets/img/act2/icons/repeat-line.svg" alt=""></button>
                    
                </div>
            </div>
        </section>
        `;
    }
}

function renderJobsHTML() {
    if (ACTIVE === 'jobs-nav') {
        mainContainer.innerHTML = `
            <section class="sec-container job-container" id="job">
            <div class="glow-effect"></div>
            <div class="position-container">
                <div class="job-panel">
                        <h1> Play your Part in <br> Our Rhythm</h1>
                        <p>Be the reason to feel the presence of every rhythm in each sip. <br>Join the ensemble of curators, artisans and storytellers!</p>
                </div>
            </div>
            <div class="about-job">
                <div class="music-band job">
                    
                    <div class="job-description">
                        <div class="img-icon"></div>
                        <h2>Music Band</h2>
                        <p>You select the instrument, you define the evening. Shape the auditory soul of the Velvet Groove</p>
                    </div>
                    <button class="button-primary"> Apply for this Role </button>
                </div>

                <div class="lead-barista job">
                    <div class="job-description">
                        <div class="img-icon"></div>
                        <h2>Lead Barista</h2>
                        <p>The maestro of the espresso. Dialing in the daily grind, training the crew, and making sure every pour contains the essence of the rhythm.</p>
                    </div>
                    <button class="button-primary"> View Details </button>
                </div>    
                
            </div>

            <div class="other-jobs">

                <div class="lounge-host job">
                    <div class="job-description">
                        <div class="img-icon"></div>
                        <h2>Lounge Host</h2>
                        <p>You set the rhythm for the night and guide our patrons to their perfect listening spot. </p>
                    </div>
                    <button class="button-primary"> View Details </button>
                </div> 

                <div class="manager job">
                    <div class="job-description">
                        <div class="img-icon"></div>
                        <h2>Operations Manager</h2>
                        <p>"The producer of our lounge—keeping the inventory stocked, the team in sync, and the whole operation running on a smooth tempo." </p>
                    </div>
                    <button class="button-primary"> View Details </button>
                </div> 

                <div class="mixologist job">
                    <div class="job-description">
                        <div class="img-icon"></div>
                        <h2>Mixologist</h2>
                        <p>You’re the headliner behind the bar, turning slow-roasted espresso and deep spirits into perfect liquid tracks. </p>
                    </div>
                    <button class="button-primary"> View Details </button>
                </div> 

            </div>
            
        </section>
        `;
    }
}