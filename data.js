const OSCAR_CATEGORIES = [
  {
    id: "mejor_pelicula",
    name: "Mejor Película",
    emoji: "🎬",
    nominees: [
      "Bugonia","F1","Frankenstein","Hamnet","Marty Supreme",
      "Una batalla tras otra","El agente secreto",
      "Valor sentimental","Los pecadores","Sueños de trenes"
    ]
  },
  {
    id: "mejor_casting",
    name: "Mejor Casting",
    emoji: "🎭",
    nominees: [
      "Hamnet","Marty Supreme","Una batalla tras otra",
      "El agente secreto","Los pecadores"
    ]
  },
  {
    id: "mejor_direccion",
    name: "Mejor Dirección",
    emoji: "🎥",
    nominees: [
      "Chloé Zhao — Hamnet",
      "Josh Safdie — Marty Supreme",
      "Paul Thomas Anderson — Una batalla tras otra",
      "Joachim Trier — Valor sentimental",
      "Ryan Coogler — Los pecadores"
    ]
  },
  {
    id: "mejor_guion_adaptado",
    name: "Mejor Guion Adaptado",
    emoji: "📖",
    nominees: [
      "Bugonia","Frankenstein","Hamnet",
      "Una batalla tras otra","Sueños de trenes"
    ]
  },
  {
    id: "mejor_guion_original",
    name: "Mejor Guion Original",
    emoji: "📝",
    nominees: [
      "Blue Moon","It Was Just an Accident","Marty Supreme",
      "Valor sentimental","Los pecadores"
    ]
  },
  {
    id: "mejor_montaje",
    name: "Mejor Montaje",
    emoji: "✂️",
    nominees: [
      "F1","Marty Supreme","Una batalla tras otra",
      "Valor sentimental","Los pecadores"
    ]
  },
  {
    id: "mejor_sonido",
    name: "Mejor Sonido",
    emoji: "🔊",
    nominees: [
      "F1","Marty Supreme","Una batalla tras otra",
      "Valor sentimental","Los pecadores"
    ]
  },
  {
    id: "mejor_pelicula_internacional",
    name: "Mejor Película Internacional",
    emoji: "🌍",
    nominees: [
      "El agente secreto — Brasil",
      "It Was Just an Accident — Francia",
      "Valor sentimental — Noruega",
      "Sirat — España",
      "The Voice of Hind Rajab — Túnez"
    ]
  },
  {
    id: "mejor_actor",
    name: "Mejor Actor",
    emoji: "🌟",
    nominees: [
      "Ethan Hawke — Blue Moon",
      "Leonardo DiCaprio — Una batalla tras otra",
      "Timothée Chalamet — Marty Supreme",
      "Michael B. Jordan — Los pecadores",
      "Wagner Moura — El agente secreto"
    ]
  },
  {
    id: "mejor_actriz",
    name: "Mejor Actriz",
    emoji: "💫",
    nominees: [
      "Jessie Buckley — Hamnet",
      "Rose Byrne — If I Had Legs I'd Kick You",
      "Kate Hudson — Song Sung Blue",
      "Renate Reinsve — Valor sentimental",
      "Emma Stone — Bugonia"
    ]
  },
  {
    id: "mejor_actor_reparto",
    name: "Mejor Actor de Reparto",
    emoji: "🥈",
    nominees: [
      "Benicio del Toro — Una batalla tras otra",
      "Jacob Elordi — Frankenstein",
      "Delroy Lindo — Los pecadores",
      "Sean Penn — Una batalla tras otra",
      "Stellan Skarsgård — Valor sentimental"
    ]
  },
  {
    id: "mejor_actriz_reparto",
    name: "Mejor Actriz de Reparto",
    emoji: "🥈",
    nominees: [
      "Elle Fanning — Valor sentimental",
      "Inga Ibsdotter Lilleaas — Valor sentimental",
      "Amy Madigan — Weapons",
      "Wunmi Mosaku — Los pecadores",
      "Teyana Taylor — Una batalla tras otra"
    ]
  },
  {
    id: "mejor_fotografia",
    name: "Mejor Fotografía",
    emoji: "📷",
    nominees: [
      "Frankenstein","Marty Supreme","Una batalla tras otra",
      "Los pecadores","Sueños de trenes"
    ]
  },
  {
    id: "mejor_vestuario",
    name: "Mejor Vestuario",
    emoji: "👗",
    nominees: [
      "Avatar: Fuego y ceniza","Frankenstein","Hamnet",
      "Marty Supreme","Los pecadores"
    ]
  },
  {
    id: "mejores_efectos",
    name: "Mejores Efectos Especiales",
    emoji: "✨",
    nominees: [
      "Avatar: Fuego y ceniza","F1","Jurassic World: El renacer",
      "Laberinto en llamas","Los pecadores"
    ]
  },
  {
    id: "mejor_diseno_produccion",
    name: "Mejor Diseño de Producción",
    emoji: "🏛️",
    nominees: [
      "Frankenstein","Hamnet","Marty Supreme",
      "Una batalla tras otra","Los pecadores"
    ]
  },
  {
    id: "mejor_animacion",
    name: "Mejor Película de Animación",
    emoji: "✏️",
    nominees: [
      "Arco","Elio","Kpop Demon Hunters",
      "Little Amelie","Zootrópolis 2 / Zootopia 2"
    ]
  },
  {
    id: "mejor_documental",
    name: "Mejor Documental",
    emoji: "📽️",
    nominees: [
      "The Alabama Solution","Come See Me in the Good Light",
      "Cutting Through Rocks","Mr. Nobody Against Putin",
      "The Perfect Neighbor"
    ]
  },
  {
    id: "mejor_corto_animacion",
    name: "Mejor Corto de Animación",
    emoji: "🎨",
    nominees: [
      "Butterfly","Forevergreen","The Girl Who Cried Pearls",
      "Retirement Plan","The Three Sisters"
    ]
  },
  {
    id: "mejor_corto_documental",
    name: "Mejor Corto Documental",
    emoji: "🎞️",
    nominees: [
      "All the Empty Rooms","Armed Only with a Camera",
      "Children No More","The Devil Is Busy","Perfectly a Strangeness"
    ]
  },
  {
    id: "mejor_corto",
    name: "Mejor Corto",
    emoji: "🎦",
    nominees: [
      "Butcher's Stain","A Friend of Dorothy",
      "Jane Austen's Period Drama","The Singers",
      "Two People Exchanging Saliva"
    ]
  },
  {
    id: "mejor_banda_sonora",
    name: "Mejor Banda Sonora",
    emoji: "🎵",
    nominees: [
      "Bugonia","Frankenstein","Hamnet",
      "Una batalla tras otra","Los pecadores"
    ]
  },
  {
    id: "mejor_cancion",
    name: "Mejor Canción Original",
    emoji: "🎤",
    nominees: [
      "Dear Me — Diane Warren",
      "Golden — Kpop Demon Hunters",
      "I Lied to You — Los pecadores",
      "Sweet Dreams of Joy — Viva Verdi!",
      "Train Dreams — Sueños de trenes"
    ]
  },
  {
    id: "mejor_maquillaje",
    name: "Mejor Maquillaje y Peluquería",
    emoji: "💄",
    nominees: [
      "Frankenstein","Kokuho","Los pecadores",
      "The Smashing Machine","La hermanastra fea"
    ]
  }
];
