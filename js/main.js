const header = document.getElementById('header');
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));

    const setHeaderState = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };

    const setActiveLink = () => {
      const current = sections.reduce((active, section) => {
        return window.scrollY >= section.offsetTop - 150 ? section.id : active;
      }, 'home');

      navAnchors.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    };

    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    navAnchors.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    setHeaderState();
    setActiveLink();
    window.addEventListener('scroll', () => {
      setHeaderState();
      setActiveLink();
    }, { passive: true });
