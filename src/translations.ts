export type Language = 'en' | 'ar';

export interface Translation {
  nav: {
    home: string;
    games: string;
    projects: string;
    youtube: string;
    about: string;
    contact: string;
  };
  hero: {
    greeting: string;
    subtitle: string;
    ctaGames: string;
    ctaYoutube: string;
  };
  about: {
    title: string;
    bio: string;
    skills: string;
    skillList: {
      godot: string;
      gameDesign: string;
      graphicDesign: string;
      videoEditing: string;
    };
    stats: {
      games: string;
      youtube: string;
      experience: string;
      age: string;
    };
  };
  games: {
    title: string;
    playNow: string;
  };
  youtube: {
    title: string;
    subscribe: string;
    description: string;
    subscribers: string;
    totalViews: string;
    totalVideos: string;
    views: string;
  };
  projects: {
    title: string;
    visit: string;
    items: {
      title: string;
      desc: string;
      url: string;
      image: string;
    }[];
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    discord: string;
    support: string;
  };
  footer: {
    madeWith: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      games: 'Games',
      projects: 'Projects',
      youtube: 'YouTube',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm Omar",
      subtitle: 'Indie Game Developer | YouTuber | Godot Engine',
      ctaGames: 'See My Games',
      ctaYoutube: 'My YouTube Channel',
    },
    about: {
      title: 'About Me',
      bio: "I'm a 14-year-old indie game developer and YouTuber from Giza, Egypt. I love creating immersive experiences using the Godot Engine and sharing my journey with the world.",
      skills: 'My Skills',
      skillList: {
        godot: 'Godot Engine',
        gameDesign: 'Game Design',
        graphicDesign: 'Graphic Design',
        videoEditing: 'Video Editing',
      },
      stats: {
        games: '6+ Games Created',
        youtube: 'Active YouTuber',
        experience: 'Indie Dev',
        age: '14 Years Old',
      },
    },
    games: {
      title: 'My Games',
      playNow: 'Play Now',
    },
    youtube: {
      title: 'YouTube Channel',
      subscribe: 'Subscribe',
      description: 'I share game development tutorials, devlogs, and gaming content. Join our community of creators!',
      subscribers: 'Subscribers',
      totalViews: 'Total Views',
      totalVideos: 'Total Videos',
      views: 'views',
    },
    projects: {
      title: 'My Projects',
      visit: 'Visit Site',
      items: [
        {
          title: 'Sadqa',
          desc: 'A continuous charity (Sadqa Jariyah) website.',
          url: 'https://sadqa.netlify.app/',
          image: '/Sadqa.png'
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      discord: 'Join Discord',
      support: 'Support Me',
    },
    footer: {
      madeWith: 'Made with by Omar Dev',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      games: 'ألعابي',
      projects: 'مشاريعي',
      youtube: 'يوتيوب',
      about: 'عني',
      contact: 'تواصل معي',
    },
    hero: {
      greeting: 'مرحباً، أنا عمر',
      subtitle: 'مطور ألعاب مستقل | يوتيوبر | محرك جودوت',
      ctaGames: 'شوف ألعابي',
      ctaYoutube: 'قناتي على يوتيوب',
    },
    about: {
      title: 'عن عمر',
      bio: 'أنا مطور ألعاب مستقل ويوتيوبر عندي 14 سنه من الجيزة، مصر. و بعمل العاب بجودوت و مواقع كمان الموقع الي انت فيه دا انا الي عاملوه دعمك ليا هيفرق معايا.',
      skills: 'مهاراتي',
      skillList: {
        godot: 'محرك جودوت',
        gameDesign: 'تصميم الألعاب',
        graphicDesign: 'تصميم الجرافيك',
        videoEditing: 'مونتاج الفيديو',
      },
      stats: {
        games: '+6 ألعاب منشورة',
        youtube: 'يوتيوبر نشط',
        experience: 'مطور مستقل',
        age: 'عندي 14 سنه',
      },
    },
    games: {
      title: 'ألعابي',
      playNow: 'العب الآن',
    },
    youtube: {
      title: 'قناة اليوتيوب',
      subscribe: 'اشترك الآن',
      description: 'ما تنساش الفولو على اليوتيوب محتوايا هيعجبك',
      subscribers: 'مشترك',
      totalViews: 'إجمالي المشاهدات',
      totalVideos: 'إجمالي الفيديوهات',
      views: 'مشاهدة',
    },
    projects: {
      title: 'مشاريعي',
      visit: 'زيارة الموقع',
      items: [
        {
          title: 'صدقة',
          desc: 'موقع صدقة جاريه',
          url: 'https://sadqa.netlify.app/',
          image: '/Sadqa.png'
        }
      ]
    },
    contact: {
      title: 'تواصل معي',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      discord: 'انضم لديسكورد',
      support: 'ادعمني',
    },
    footer: {
      madeWith: 'صنع بواسطة عمر ديف',
    },
  },
};
