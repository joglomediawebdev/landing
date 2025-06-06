    AOS.init({
        once: false, // Allow animations to replay when scrolling back
        offset: 100, // Trigger animations earlier
        duration: 1000, // Smooth duration
        easing: 'ease-out', // Smoother easing
    });
    // Add scroll event listener to change navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const mainSection = document.querySelector('.hero');
        if (window.scrollY > mainSection.offsetHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

// Main Category Filter functionality
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const subcategoryFilters = document.getElementById('subcategory-filters');
    const websiteProjectsContainer = document.querySelector('#website-projects .grid');
    const aplikasiProjectsContainer = document.querySelector('#aplikasi-projects .grid');
    const mainGrid = document.getElementById('main-grid');
    const websiteSection = document.getElementById('website-projects');
    const aplikasiSection = document.getElementById('aplikasi-projects');
    const aplikasiHeading = aplikasiSection.querySelector('h3');

    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all main filter buttons
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked main filter button
            button.classList.add('active');

            const mainFilterValue = button.getAttribute('data-main-filter');

            // Show/hide subcategory filters with animation
            if (mainFilterValue === 'website') {
                subcategoryFilters.classList.remove('hidden');
                // Reset subcategory filter to 'all'
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                allFilterBtn.classList.add('active');
            } else {
                subcategoryFilters.classList.add('hidden');
            }

            // Clear containers
            websiteProjectsContainer.innerHTML = '';
            aplikasiProjectsContainer.innerHTML = '';
            mainGrid.innerHTML = '';

            // Hide both sections by default
            websiteSection.classList.add('hidden');
            aplikasiSection.classList.add('hidden');
            mainGrid.classList.add('hidden');

            if (mainFilterValue === 'website') {
                // Show website section with heading
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.add('hidden');
                // Populate website projects based on active subcategory filter
                const activeSubFilter = document.querySelector('.filter-btn.active').getAttribute(
                    'data-filter');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const subCategory = card.getAttribute('data-category');
                    if (mainCategory === 'website' && (activeSubFilter === 'all' ||
                            subCategory === activeSubFilter)) {
                        const clonedCard = card.cloneNode(true);
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            } else if (mainFilterValue === 'aplikasi') {
                // Hide both sections, show main grid without heading
                websiteSection.classList.add('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.remove('hidden');
                // Populate aplikasi projects in main grid
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    if (mainCategory === 'aplikasi') {
                        const clonedCard = card.cloneNode(true);
                        mainGrid.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            }

            AOS.refresh();
        });
    });

    // Subcategory Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all subcategory filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked subcategory filter button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Clear containers
            websiteProjectsContainer.innerHTML = '';
            aplikasiProjectsContainer.innerHTML = '';
            mainGrid.innerHTML = '';

            // Show sections based on filter
            if (filterValue === 'all') {
                // Show both sections with headings
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.remove('hidden');
                mainGrid.classList.add('hidden');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const clonedCard = card.cloneNode(true);
                    if (mainCategory === 'website') {
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    } else if (mainCategory === 'aplikasi') {
                        aplikasiProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            } else {
                // Show only website section for subcategory filters
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.add('hidden');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const subCategory = card.getAttribute('data-category');
                    if (mainCategory === 'website' && subCategory === filterValue) {
                        const clonedCard = card.cloneNode(true);
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            }

            AOS.refresh();
        });
    });

    // Modal functionality
    function openModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Close modal when clicking outside the image
    document.getElementById('imageModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Close modal when clicking the close button
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Add click event to project cards to open modal
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.project-card');
        if (card) {
            const imageSrc = card.getAttribute('data-image');
            openModal(imageSrc);
        }
    });

    // Initialize: Show subcategory filters by default (Website is active)
    subcategoryFilters.classList.remove('hidden');

    // Initialize: Show all projects under their respective headings
    websiteProjectsContainer.innerHTML = '';
    aplikasiProjectsContainer.innerHTML = '';
    mainGrid.innerHTML = '';
    websiteSection.classList.remove('hidden');
    aplikasiSection.classList.remove('hidden');
    mainGrid.classList.add('hidden');
    projectCards.forEach(card => {
        const mainCategory = card.getAttribute('data-main-category');
        const clonedCard = card.cloneNode(true);
        if (mainCategory === 'website') {
            websiteProjectsContainer.appendChild(clonedCard);
            clonedCard.classList.remove('hidden');
            clonedCard.classList.add('show');
        } else if (mainCategory === 'aplikasi') {
            aplikasiProjectsContainer.appendChild(clonedCard);
            clonedCard.classList.remove('hidden');
            clonedCard.classList.add('show');
        }
    });
    AOS.refresh();

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init();
}

// Modal Konsultasi Toggle
const openModalButtons = document.querySelectorAll('#openConsultationModal, #openConsultationModalBottom');
const consultationModal = document.getElementById('consultationModal');
const closeModalButton = document.querySelector('.modal-close');

if (openModalButtons.length > 0 && consultationModal) {
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            consultationModal.classList.add('active');
        });
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', closeConsultationModal);
}

function closeConsultationModal() {
    if (consultationModal) {
        consultationModal.classList.remove('active');
    }
}

function closeModal() {
    closeConsultationModal();
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validasi nama
    if (!name || name.length < 2) {
        alert('Nama harus diisi minimal 2 karakter!');
        return false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert('Email harus diisi dengan format yang benar!');
        return false;
    }

    // Validasi phone
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || phoneDigits.length < 10) {
        alert('Nomor telepon harus diisi minimal 10 digit!');
        return false;
    }

    // Tampilkan loading
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Mengirim...';
        submitButton.disabled = true;
    }

    return true;
}


// Portfolio Filter Logic (jika ada)
document.addEventListener('DOMContentLoaded', () => {
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const subFilterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const subcategoryFilters = document.getElementById('subcategory-filters');
    const websiteProjects = document.getElementById('website-projects');
    const aplikasiProjects = document.getElementById('aplikasi-projects');

    if (mainFilterButtons.length === 0) return; // Skip jika tidak ada filter

    function filterProjects() {
        const activeMainFilter = document.querySelector('.main-filter-btn.active')?.getAttribute('data-main-filter') || 'website';
        const activeSubFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

        projectCards.forEach(card => {
            card.classList.add('hidden');
        });

        projectCards.forEach(card => {
            const cardMainCategory = card.dataset.mainCategory;
            const cardCategory = card.dataset.category;

            if (activeMainFilter === 'website' && cardMainCategory === 'website') {
                if (activeSubFilter === 'all' || cardCategory === activeSubFilter) {
                    card.classList.remove('hidden');
                }
            } else if (activeMainFilter === 'aplikasi' && cardMainCategory === 'aplikasi') {
                card.classList.remove('hidden');
            }
        });

        if (websiteProjects && aplikasiProjects && subcategoryFilters) {
            if (activeMainFilter === 'website') {
                websiteProjects.classList.remove('hidden');
                aplikasiProjects.classList.add('hidden');
                subcategoryFilters.classList.remove('hidden');
            } else if (activeMainFilter === 'aplikasi') {
                websiteProjects.classList.add('hidden');
                aplikasiProjects.classList.remove('hidden');
                subcategoryFilters.classList.add('hidden');
            }
        }
    }

    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            const allProjectBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allProjectBtn) allProjectBtn.classList.add('active');

            filterProjects();
        });
    });

    subFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects();
        });
    });

    filterProjects();
});

// Modal Image Viewer (jika ada)
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
    }
}

const closeImageModal = document.getElementById('closeModal');
if (closeImageModal) {
    closeImageModal.addEventListener('click', () => {
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            imageModal.classList.add('hidden');
        }
    });
}

const imageModal = document.getElementById('imageModal');
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.add('hidden');
        }
    });
}