export const artistData = {
  yori: {
    name: 'YoRI',
    titleYo: 'Yo',
    titleRi: 'RI',
    signature: 'YoRI',
    tagline: 'Experimenting With Imagination',
    bio: 'YoRI (Aurel Mayori) began her career in the entertainment industry at the age of 9 as an actress. Her long journey from former idol group member to solo artist has forged her identity as a songwriter, characterized by poetic, emotionally charged lyrics and a continuous exploration of diverse music genres.',
    heroImage: '/home/yori.jpg',
    socials: {
      instagram: { count: '238K', handle: '@yoribeneran', url: 'https://www.instagram.com/yoribeneran' },
      tiktok: { count: '535K', handle: '@yoribeneran', url: 'https://www.tiktok.com/@yoribeneran' },
      x: { count: '46.7K', handle: '@yoribeneran', url: 'https://x.com/yoribeneran' },
      youtube: { count: '181K', handle: '@itsyori', url: 'https://youtube.com/@itsyori' },
      spotify: { count: 'LISTEN', handle: 'YoRI', url: 'https://open.spotify.com/artist/7KWwccszhCF3f6pYeVWMTD?si=oWvvv77KS7iSqTv-mpQMiQ' }
    },
    trackInfo: {
      title: 'Ninety Horsepower',
      artist: 'YoRi',
      album: 'The Anti Climax Act I',
      cover: new URL('./assets/artist.png', import.meta.url).href,
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    products: [
      {
        id: 1,
        name: 'YoRI Signature Hoodie',
        price: 'Rp 350.000',
        tag: 'Best Seller',
        category: 'apparel',
        image: new URL('./assets/merch_hoodie.png', import.meta.url).href
      },
      {
        id: 2,
        name: 'The Anti Climax CD Album',
        price: 'Rp 150.000',
        tag: 'New Release',
        category: 'music',
        image: new URL('./assets/merch_cd.png', import.meta.url).href
      },
      {
        id: 3,
        name: 'YoRI Graphic Printed Tee',
        price: 'Rp 220.000',
        tag: 'Limited',
        category: 'apparel',
        image: new URL('./assets/merch_tshirt.png', import.meta.url).href
      },
      {
        id: 4,
        name: 'Official Sticker Pack',
        price: 'Rp 45.000',
        tag: 'Accessories',
        category: 'accessories',
        image: new URL('./assets/merch.png', import.meta.url).href
      },
      {
        id: 5,
        name: 'YoRI Acrylic Keychain',
        price: 'Rp 35.000',
        tag: 'Accessories',
        category: 'accessories',
        image: new URL('./assets/merch.png', import.meta.url).href
      },
      {
        id: 6,
        name: 'Anti Climax Vinyl Record',
        price: 'Rp 450.000',
        tag: 'Limited',
        category: 'music',
        image: new URL('./assets/merch_cd.png', import.meta.url).href
      },
      {
        id: 7,
        name: 'YoRI Beanie Hat',
        price: 'Rp 120.000',
        tag: 'New Release',
        category: 'apparel',
        image: new URL('./assets/merch_hoodie.png', import.meta.url).href
      },
      {
        id: 8,
        name: 'Signed Poster Set',
        price: 'Rp 75.000',
        tag: 'Exclusive',
        category: 'bundles',
        image: new URL('./assets/merch.png', import.meta.url).href
      }
    ],
    highlights: [
      {
        id: 1,
        year: '2024',
        type: 'Netflix Original Film',
        title: 'LUPA DARATAN',
        role: "as 'Dina'",
        media: '/highlight/lupadarat.webp',
        mediaType: 'image',
        category: 'Film',
        platform: 'Netflix',
        description: 'Played the role of Dina in the Netflix original film "Lupa Daratan" — a story about identity, longing, and the search for self between two different cultures.',
        icon: 'film'
      },
      {
        id: 2,
        year: '2024',
        type: 'Starring at Movie',
        title: 'KAKA BOSS',
        role: "Movies as 'Jennie'",
        media: '/highlight/kakabos.mp4',
        mediaType: 'video',
        category: 'Film',
        platform: 'Bioskop',
        description: 'Starred as Jennie in the comedy-drama film "Kaka Boss" — a spirited, resilient character bringing fresh energy into friendship and career dynamics.',
        icon: 'video'
      },
      {
        id: 3,
        year: '2023',
        type: 'Brand Ambassador',
        title: 'Lokapala',
        role: 'MOBA Games',
        media: '/highlight/lokapala.jpg',
        mediaType: 'image',
        category: 'Gaming',
        platform: 'PC, Mobile',
        description: 'Joined as a voice actress for a character in the game Lokapala, bringing the character to life with passionate and emotional vocals.',
        icon: 'gamepad'
      },
      {
        id: 4,
        year: '2023',
        type: 'Starring at Series',
        title: 'Bardion',
        role: 'Superhero Series',
        media: '/highlight/bardion.jpg',
        mediaType: 'image',
        category: 'Series',
        platform: 'Streaming',
        description: 'Appeared as one of the main characters in the superhero series "Bardion" — a sci-fi tale blending action, emotion, and heroic identity.',
        icon: 'tv'
      },
      {
        id: 5,
        year: '2025',
        type: '1st Album & Showcase',
        title: '21 GRAMS',
        role: '"The Anti Climax Act I"',
        media: '/highlight/21gram.jpg',
        mediaType: 'image',
        category: 'Music',
        platform: 'Streaming, Live',
        description: 'Debut album "21 Grams — The Anti Climax Act I" serves as an honest artistic statement, exploring themes of loss, growth, and acceptance.',
        icon: 'music'
      },
      {
        id: 6,
        year: '2024',
        type: 'Live Session',
        title: 'SESI DENGAR',
        role: 'Intimate Acoustic Set',
        media: '/highlight/sesidengar.jpg',
        mediaType: 'image',
        category: 'Music',
        platform: 'Live Event',
        description: 'An intimate, stripped-down acoustic session featuring YoRi — delivering songs with emotional depth and intimacy rarely felt on big stages.',
        icon: 'music'
      },
      {
        id: 7,
        year: '2024',
        type: 'Music Festival',
        title: 'PESTAPORA',
        role: 'Main Stage Performance',
        media: '/highlight/pestapora.webp',
        mediaType: 'image',
        category: 'Festival',
        platform: 'Jakarta',
        description: 'Debut performance on the main stage of Pestapora — one of Indonesia\'s largest music festivals — introducing YoRi to thousands of new listeners.',
        icon: 'music'
      }
    ],
    albums: [
      {
        id: '4PDOTk2LsP8x0dhFd3pqbG',
        title: 'Pulang',
        type: 'SINGLE',
        year: '2026',
        image: 'https://i.scdn.co/image/ab67616d0000b2733286c9c6fdf39ffcc9fc8e67',
        artist: 'YoRI',
        glow: 'rgba(0, 180, 216, 0.4)',
        color: '#00b4d8',
        spotifyUrl: 'https://open.spotify.com/album/4PDOTk2LsP8x0dhFd3pqbG',
        appleMusicUrl: 'https://music.apple.com/album/pulang-single/1739501234',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Pulang', artist: 'YoRI', duration: '04:00' }
        ]
      },
      {
        id: '1ixQM69tYN1UbRpMPa7s1G',
        title: '21 grams',
        type: 'ALBUM',
        year: '2025',
        image: 'https://i.scdn.co/image/ab67616d0000b273a04955aec8b7c8893461da1a',
        artist: 'YoRI',
        glow: 'rgba(255, 42, 109, 0.4)',
        color: '#ff2a6d',
        spotifyUrl: 'https://open.spotify.com/album/1ixQM69tYN1UbRpMPa7s1G',
        appleMusicUrl: 'https://music.apple.com/album/21-grams/1712345678',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Unlock (Indonesian Ver.)', artist: 'YoRI', duration: '04:05' },
          { num: '02', title: 'Ripple', artist: 'YoRI', duration: '03:28' },
          { num: '03', title: 'Shōjo Manga', artist: 'YoRI', duration: '04:35' },
          { num: '04', title: 'Ruby Biru', artist: 'YoRI', duration: '03:54' },
          { num: '05', title: 'Anti-climax', artist: 'YoRI', duration: '03:12' },
          { num: '06', title: 'Ghrelin', artist: 'YoRI', duration: '04:40' },
          { num: '07', title: 'Sunset Latte', artist: 'YoRI', duration: '03:33' },
          { num: '08', title: 'Resep Untuk Hidup', artist: 'YoRI', duration: '02:59' }
        ]
      },
      {
        id: '7n0t2w3pd9lQLTSNzoJNxg',
        title: 'RUSAK',
        type: 'SINGLE',
        year: '2025',
        image: 'https://i.scdn.co/image/ab67616d0000b2736e34a966311fe2709b844d25',
        artist: 'YoRI',
        glow: 'rgba(255, 154, 60, 0.4)',
        color: '#ff9a3c',
        spotifyUrl: 'https://open.spotify.com/album/7n0t2w3pd9lQLTSNzoJNxg',
        appleMusicUrl: 'https://music.apple.com/album/rusak-single/1723456789',
        isSaved: false,
        tracks: [
          { num: '01', title: 'RUSAK', artist: 'YoRI', duration: '03:15' }
        ]
      },
      {
        id: '5pgLGJSi8PYygqTFQ6XjzF',
        title: 'Ruby Biru',
        type: 'SINGLE',
        year: '2024',
        image: 'https://i.scdn.co/image/ab67616d0000b273bdcc44254eda2779b923dabf',
        artist: 'YoRI',
        glow: 'rgba(67, 97, 238, 0.4)',
        color: '#4361ee',
        spotifyUrl: 'https://open.spotify.com/album/5pgLGJSi8PYygqTFQ6XjzF',
        appleMusicUrl: 'https://music.apple.com/album/ruby-biru-single/1701234567',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Ruby Biru', artist: 'YoRI', duration: '03:54' }
        ]
      },
      {
        id: '5UpU9mWvv5Csb4gTST3cgx',
        title: 'Shojo Manga',
        type: 'SINGLE',
        year: '2023',
        image: 'https://i.scdn.co/image/ab67616d0000b27315cc23eaec1f3607315254fd',
        artist: 'YoRI',
        glow: 'rgba(138, 43, 226, 0.4)',
        color: '#8a2be2',
        spotifyUrl: 'https://open.spotify.com/album/5UpU9mWvv5Csb4gTST3cgx',
        appleMusicUrl: 'https://music.apple.com/album/shojo-manga-single/1690123456',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Shojo Manga', artist: 'YoRI', duration: '04:35' }
        ]
      },
      {
        id: '3mqlL06BljjwHn0HKBHs2J',
        title: 'Ookami Cafe',
        type: 'EP',
        year: '2022',
        image: 'https://i.scdn.co/image/ab67616d0000b273348e39284bf4affa4fcac5a7',
        artist: 'YoRI',
        glow: 'rgba(0, 245, 153, 0.4)',
        color: '#00f599',
        spotifyUrl: 'https://open.spotify.com/album/3mqlL06BljjwHn0HKBHs2J',
        appleMusicUrl: 'https://music.apple.com/album/ookami-cafe-ep/1680123457',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Ookami Cafe', artist: 'YoRI', duration: '03:02' },
          { num: '02', title: 'Sunday Sundae', artist: 'YoRI', duration: '03:15' },
          { num: '03', title: 'Sunset Latte', artist: 'YoRI', duration: '03:33' }
        ]
      },
      {
        id: '5ubyR5LtuqpsJiYh58Cxtn',
        title: 'アンロック (Unlock)',
        type: 'SINGLE',
        year: '2022',
        image: 'https://i.scdn.co/image/ab67616d0000b273f71b2f6a7b3c3eba75737a7c',
        artist: 'YoRI',
        glow: 'rgba(200, 245, 0, 0.4)',
        color: '#c8f500',
        spotifyUrl: 'https://open.spotify.com/album/5ubyR5LtuqpsJiYh58Cxtn',
        appleMusicUrl: 'https://music.apple.com/album/unlock-single/1670123458',
        isSaved: false,
        tracks: [
          { num: '01', title: 'アンロック (Unlock)', artist: 'YoRI', duration: '04:02' }
        ]
      },
      {
        id: '7CGGayKl7aZyLhoP0htCWG',
        title: 'Ripple',
        type: 'SINGLE',
        year: '2022',
        image: 'https://i.scdn.co/image/ab67616d0000b273b12b101ef93930979018cbdf',
        artist: 'YoRI',
        glow: 'rgba(0, 245, 200, 0.4)',
        color: '#00f5c8',
        spotifyUrl: 'https://open.spotify.com/album/7CGGayKl7aZyLhoP0htCWG',
        appleMusicUrl: 'https://music.apple.com/album/ripple-single/1660123459',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Ripple', artist: 'YoRI', duration: '03:28' }
        ]
      },
      {
        id: '21Zbq5NGDuH1hr9IfFV41h',
        title: 'Unlock (Indonesian Ver.)',
        type: 'SINGLE',
        year: '2022',
        image: 'https://i.scdn.co/image/ab67616d0000b273c44232e5f499fd11c2b2ac4e',
        artist: 'YoRI',
        glow: 'rgba(255, 0, 127, 0.4)',
        color: '#ff007f',
        spotifyUrl: 'https://open.spotify.com/album/21Zbq5NGDuH1hr9IfFV41h',
        appleMusicUrl: 'https://music.apple.com/album/unlock-indonesian-ver-single/1650123460',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Unlock (Indonesian Ver.)', artist: 'YoRI', duration: '04:05' }
        ]
      }
    ]
  },
  '90hp': {
    name: '90HorsesPower',
    titleYo: '90',
    titleRi: 'HP',
    signature: '90HP',
    tagline: 'Songs for Ordinary Fighters',
    bio: 'Ninety Horsepower (90HP) is an Indonesian Alternative Power Pop band blending energetic guitars, memorable melodies, and honest stories about ordinary people who choose to keep moving. 90HP creates songs that embrace resilience, small victories, and hope without pretending life is easy.',
    heroImage: '/home/90hp.png',
    socials: {
      instagram: { count: '', handle: '@90horsepower', url: 'https://www.instagram.com/90horsepower' },
      tiktok: { count: '', handle: '@90horsepower', url: 'https://www.tiktok.com/@90horsepower' },
      youtube: { count: '', handle: '@90HorsePower', url: 'https://www.youtube.com/@90HorsePower' },
      spotify: { count: '', handle: '90horsepower', url: 'https://open.spotify.com/artist/0Dgmxi8oh7NaL332kwpo3a?si=D4EeHyZ_TeaHptVC3nyQ9w' }
    },
    trackInfo: {
      title: 'Gusar',
      artist: 'Ninety Horsepower',
      album: 'Gusar - Single',
      cover: new URL('./assets/artist.png', import.meta.url).href,
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    products: [
      {
        id: 101,
        name: 'CD Album Pagi Pasti Kembali',
        price: 'Rp 35.000',
        tag: '',
        category: 'music',
        image: '/90horsepower/cd_pagi_pasti_kembali.png',
        stockInfo: 'Ready Stock 30pcs',
        location: 'Jakarta',
        description: 'Physical CD Album "Pagi Pasti Kembali" by Ninety Horsepower. Features alternative tracks with emotional garage rock distortion.'
      },
      {
        id: 102,
        name: 'Tshirt GUSAR',
        price: 'Rp 120.000',
        tag: 'Pre-Order',
        category: 'apparel',
        image: '/90horsepower/tshirt_gusar_kids.png',
        hoverImage: '/90horsepower/tshirt_gusar_models.png',
        stockInfo: 'shipping not included.',
        poPeriod: 'Pre-Order Period > July 1 to July 14',
        location: 'Jakarta',
        description: 'Exclusive limited edition T-shirt for Ninety Horsepower\'s single GUSAR. Made of high-quality Cotton Combed with retro graphic screen print.'
      }
    ],
    highlights: [
      {
        id: 101,
        year: '2025',
        type: 'Single Launch',
        title: 'GUSAR',
        role: 'Official Release',
        media: '/highlight/90hp_highlight_1.png',
        mediaType: 'image',
        category: 'Music',
        platform: 'Spotify, Apple, Instagram',
        description: 'The latest single "Gusar" was officially released in November 2025. A contemplative alternative-indie track exploring self-acceptance and the courage to surrender without defeat.',
        icon: 'music'
      },
      {
        id: 102,
        year: '2025',
        type: 'Music Video',
        title: 'BETMEN',
        role: 'Official MV Out Now',
        media: '/highlight/90hp_highlight_2.png',
        mediaType: 'image',
        category: 'Music Video',
        platform: 'YouTube, Instagram',
        description: 'The official music video for "Betmen" was released with dark cinematic and poetic visuals, representing a metaphor for a puzzling relationship losing direction.',
        icon: 'video'
      },
      {
        id: 103,
        year: '2024',
        type: 'EP Trilogy',
        title: 'RE: SIGN - GRET - TRY',
        role: 'Physical & Digital EP',
        media: '/highlight/90hp_highlight_3.png',
        mediaType: 'image',
        category: 'Music Release',
        platform: 'Vinyl, Spotify, Instagram',
        description: 'Physical vinyl and cassette release for the EP trilogy "Re: Sign - Gret - Try", combining three phases of the band\'s emotions in signature garage guitar distortion.',
        icon: 'music'
      },
      {
        id: 104,
        year: '2024',
        type: 'Live Concert',
        title: 'JOYLAND FESTIVAL',
        role: 'Main Stage Performance',
        media: '/highlight/90hp_highlight_4.png',
        mediaType: 'image',
        category: 'Live Concert',
        platform: 'Jakarta, Instagram',
        description: 'Ninety Horsepower\'s stage performance at Joyland Festival 2024, playing a distortion-heavy setlist and celebrating their return to big festival stages.',
        icon: 'music'
      },
      {
        id: 105,
        year: '2023',
        type: 'Anniversary',
        title: '10 YEARS OF 90HP',
        role: 'Intimate Tour & Gathering',
        media: '/highlight/90hp_highlight_5.png',
        mediaType: 'image',
        category: 'Anniversary',
        platform: 'Jakarta, Instagram',
        description: 'A celebration of Ninety Horsepower\'s one-decade journey with their community and loyal listeners through an intimate show and story-sharing sessions.',
        icon: 'tv'
      },
      {
        id: 106,
        year: '2023',
        type: 'Live Session',
        title: 'BURAKKU STUDIO',
        role: 'Live Acoustic Showcase',
        media: '/highlight/90hp_highlight_6.png',
        mediaType: 'image',
        category: 'Live Session',
        platform: 'YouTube, Instagram',
        description: 'An intimate live recording session from Burakku Studio featuring raw acoustic arrangements of popular Ninety Horsepower songs with warm lighting and pure audio quality.',
        icon: 'gamepad'
      }
    ],
    albums: [
      {
        id: '90hp_album_1',
        title: 'Gusar',
        type: 'SINGLE',
        year: '2025',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8b/7e/86/8b7e8696-9c74-2ecb-6518-f68a96f962e2/8721416634499.png/600x600bb.jpg',
        artist: 'Ninety Horsepower',
        glow: 'rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
        spotifyUrl: 'https://open.spotify.com/artist/0Dgmxi8oh7NaL332kwpo3a',
        appleMusicUrl: 'https://music.apple.com/album/gusar-single/1847419003',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Gusar', artist: 'Ninety Horsepower', duration: '02:47' }
        ]
      },
      {
        id: '90hp_album_2',
        title: 'Betmen',
        type: 'SINGLE',
        year: '2025',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5b/8c/07/5b8c073e-8a91-0f39-22bc-9fb54c5bd54f/8721215199205.png/600x600bb.jpg',
        artist: 'Ninety Horsepower',
        glow: 'rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
        spotifyUrl: 'https://open.spotify.com/artist/0Dgmxi8oh7NaL332kwpo3a',
        appleMusicUrl: 'https://music.apple.com/album/betmen-single/1810224696',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Betmen', artist: 'Ninety Horsepower', duration: '04:12' }
        ]
      },
      {
        id: '90hp_album_3',
        title: 'Re: Sign - Gret - Try',
        type: 'EP',
        year: '2024',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b0/20/bc/b020bcc3-a185-0b51-fe31-df1b86cd973a/3617387865794.png/600x600bb.jpg',
        artist: 'Ninety Horsepower',
        glow: 'rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
        spotifyUrl: 'https://open.spotify.com/artist/0Dgmxi8oh7NaL332kwpo3a',
        appleMusicUrl: 'https://music.apple.com/album/re-sign-gret-try-single/1783040297',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Resign', artist: 'Ninety Horsepower', duration: '03:30' },
          { num: '02', title: 'Regret', artist: 'Ninety Horsepower', duration: '03:50' },
          { num: '03', title: 'Retry', artist: 'Ninety Horsepower', duration: '04:05' }
        ]
      },
      {
        id: '90hp_album_4',
        title: 'Pagi Pasti Kembali',
        type: 'ALBUM',
        year: '2018',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/29/d1/35/29d13583-3483-07f3-12ed-2487935a119d/8721253750338.png/600x600bb.jpg',
        artist: 'Ninety Horsepower',
        glow: 'rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
        spotifyUrl: 'https://open.spotify.com/artist/0Dgmxi8oh7NaL332kwpo3a',
        appleMusicUrl: 'https://music.apple.com/album/pagi-pasti-kembali/1797710109',
        isSaved: false,
        tracks: [
          { num: '01', title: 'Kabar Dari Hujan', artist: 'Ninety Horsepower', duration: '02:47' },
          { num: '02', title: 'Pagi Pasti Kembali', artist: 'Ninety Horsepower', duration: '03:17' },
          { num: '03', title: 'Terjatuh Terluka', artist: 'Ninety Horsepower', duration: '03:45' },
          { num: '04', title: 'Tersenyum Nanti', artist: 'Ninety Horsepower', duration: '04:01' },
          { num: '05', title: 'Hilang Mimpi', artist: 'Ninety Horsepower', duration: '03:53' },
          { num: '06', title: 'Terpaku Pilu (feat. Payung Teduh)', artist: 'Ninety Horsepower', duration: '04:28' },
          { num: '07', title: 'Jika Nanti', artist: 'Ninety Horsepower', duration: '04:43' },
          { num: '08', title: 'Tak Lepas Pergi', artist: 'Ninety Horsepower', duration: '04:17' },
          { num: '09', title: 'Pulang', artist: 'Ninety Horsepower', duration: '04:27' },
          { num: '10', title: 'Pada Aku Di Esok Hari', artist: 'Ninety Horsepower', duration: '04:46' }
        ]
      }
    ]
  }
};
