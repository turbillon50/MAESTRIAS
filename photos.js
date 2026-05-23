/* REDIBAI photographic asset library. Curated Unsplash CDN URLs. */
(function (global) {
  const U = (id, w=1800, opts='') => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80${opts ? '&'+opts : ''}`;

  const PHOTOS = {
    splash:    U('1499951360447-b19be8fe80f5', 2400), // grand library twilight
    splash_b:  U('1568667256549-094345857637', 2400), // hallway
    splash_c:  U('1541339907198-e08756dedf3f', 2400), // colonial campus dusk
    welcome:   U('1562774053-701939374585', 2400),   // modern glass campus
    login:     U('1497486751825-1233686f5d54', 2000), // warm library
    auditorium:U('1517457373958-b7bdd4587205', 2000),
    students:  U('1543269865-cbf427effbad', 1800),
    library_b: U('1568667256549-094345857637', 2000),
    graduation:U('1523580494863-6f3031224c94', 1800),
    classroom: U('1523050854058-8df90110c9f1', 1800),
    abstract:  U('1581090700227-1e37b190418e', 1800),
    architecture: U('1518770660439-4636190af475', 1800),
    research:  U('1532153975070-2e9ab71f1b14', 1800),
    books:     U('1606761568499-6d2451b23c66', 1800),
    network:   U('1483736762161-1d107f3c78e1', 1800),

    // Per location hero photos
    loc: {
      'loc-ori':  U('1541339907198-e08756dedf3f', 1600),
      'loc-cor':  U('1568667256549-094345857637', 1600),
      'loc-ver':  U('1573166364524-fb6cf9d27e98', 1600),
      'loc-pue':  U('1518770660439-4636190af475', 1600),
      'loc-cdmx': U('1518770660439-4636190af475', 1600),
      'loc-xal':  U('1497486751825-1233686f5d54', 1600),
      'loc-vir':  U('1483736762161-1d107f3c78e1', 1600)
    }
  };

  global.PHOTOS = PHOTOS;
})(window);
