/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Operator reference application
 *
 * Copyright (C) 2018-2019 Liberty Global B.V.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; version 2 of the License.
 */
"use strict";

const navigator = require('navigation');
const player = require('domainModels/player');
const { Keys, KeyPressTypes } = require('shared/constants');

const data = {
    "programs":[ {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6244324390587137112&width=180&height=240", "title": "Everything Is Copy - Nora Ephron: Scripted & Unscripted", "year": 2016, "starRating": 4, "mediumSynopsis": "This moving documentary profiles multitalented writer Nora Ephron. Friends and family discuss the late Ephron's keen wit, her remarkable body of work???which includes everything from newspaper columns to classic films???and her private battle with leukemia."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6300863880247895112&width=180&height=240", "title": "The Secret Life of Pets", "year": 2016, "starRating": 4, "mediumSynopsis": "This delightful animated comedy follows two mismatched mutts who must find their way home after getting lost in NYC. During their journey, they encounter a bunny who plans to lead a group of abandoned pets on a mission of revenge against humanity."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8395865287785302112&width=180&height=240", "title": "Christine", "year": 2016, "starRating": 4, "mediumSynopsis": "Unforgettable biopic about TV reporter Christine Chubbuck, who committed suicide during a live newscast in 1974. Chubbuck's life unravels as she grows frustrated by her vapid assignments at a local-news show in Saratosa, Fla., and develops unrequited feelings for the program's anchorman."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5127994202990139112&width=180&height=240", "title": "Deadpool", "year": 2016, "starRating": 4, "mediumSynopsis": "In this irreverent spin on the superhero genre, a mercenary reinvents himself as a wisecracking antihero called Deadpool after an experiment leaves him with advanced healing powers and a disfigured face. He then sets out to seek revenge on those responsible for his transformation."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5810430193989436112&width=180&height=240", "title": "Jackie", "year": 2016, "starRating": 4, "mediumSynopsis": "Jacqueline Kennedy deals with the immediate aftermath of the assassination of her husband and president John F. Kennedy in this historical biopic."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4742243390875224112&width=180&height=240", "title": "The Godfather Epic", "year": 2016, "starRating": 4, "mediumSynopsis": "A chronological version of Francis Ford Coppola's first two films, about the powerful Corleone crime family in America in the first half of the 20th century, contains scenes that were not included in the original theatrical releases."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8916929551932774112&width=180&height=240", "title": "Knight of Cups", "year": 2016, "starRating": 3, "mediumSynopsis": "In this lyrical character study, a Hollywood screenwriter wanders around Los Angeles and Las Vegas while reflecting on his life of excess and connection to the natural world. At the same time, he struggles to bond with his brother and father, and has a series of love affairs with the women who drift in and out of his life."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=9174726795462207112&width=180&height=240", "title": "Kung Fu Panda 3", "year": 2016, "starRating": 3, "mediumSynopsis": "Lovable martial-artist panda Po reunites with his long-lost father Li in this heartfelt animated comedy, and the duo travel to a secret panda sanctuary. There, they must work together to defeat a powerful yak who steals the life force of other warriors."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=9097764710084645112&width=180&height=240", "title": "Barbershop: The Next Cut", "year": 2016, "starRating": 3, "mediumSynopsis": "In this hysterical sequel, Calvin, Eddie and the rest of the crew at the barbershop are now working alongside a number of female hairdressers. Soon, they are all forced to band together to stop the violence in their Chicago neighborhood."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8991162520584271112&width=180&height=240", "title": "Vita Activa: The Spirit of Hannah Arendt", "year": 2016, "starRating": 3, "mediumSynopsis": "This insightful documentary profiles influential German-Jewish philosopher Hannah Arendt, detailing her relationship with a Nazi sympathizer, her experiences with anti-Semitism and her coining of the phrase \"the banality of evil\" while reporting on the trial of Adolf Eichmann."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=9019522407935043112&width=180&height=240", "title": "Deepwater Horizon", "year": 2016, "starRating": 3, "mediumSynopsis": "All is Lost director J.C. Chandor returns to deep waters for this drama based on the true story of the Deepwater Horizon disaster that resulted in the largest offshore oil spill in U.S. history, and depicting the challenges faced by the crew as they fought for survival."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8976623859424211112&width=180&height=240", "title": "Loving", "year": 2016, "starRating": 3, "mediumSynopsis": "The story of Virginian interracial couple Richard and Mildred Loving, who were sentenced to prison in 1958 for exchanging vows, and took their plea of civil rights all the way to the Supreme Court in a landmark trial."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8908594982744745112&width=180&height=240", "title": "The Shallows", "year": 2016, "starRating": 3, "mediumSynopsis": "A young surfer is hunted by a great white shark at a secluded beach, and ends up stranded on an embankment away from the shoreline. Alone and wounded, she attempts to survive the attack and get ashore in this bone-chilling thriller."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8903099826707443112&width=180&height=240", "title": "Queen of Katwe", "year": 2016, "starRating": 3, "mediumSynopsis": "This inspiring biopic of Ugandan chess prodigy Phiona Mutesi traces her journey from the slums of Katwe, where she is forced to abandon her schooling at the age of nine, to the upper echelons of the chess world after she develops an interest in the game at a youth-outreach program."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8895515387596669112&width=180&height=240", "title": "The Magnificent Seven", "year": 2016, "starRating": 3, "mediumSynopsis": "In this high-octane remake of the classic 1960 oater of the same name (itself a Western remake of \"The Seven Samurai\"), seven gunslingers protect a small town from a mining tycoon and his goons, who plan to seize the residents' land by force."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8883101937850410112&width=180&height=240", "title": "Hush", "year": 2016, "starRating": 3, "mediumSynopsis": "A reclusive author who went deaf as a teenager is hunted by a masked killer inside her isolated home, sending her into a pulse-pounding game of cat-and-mouse in order to survive the night."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8725413934242789112&width=180&height=240", "title": "The Legend of Tarzan", "year": 2016, "starRating": 3, "mediumSynopsis": "This thrilling adventure yarn finds an older and wiser Tarzan returning to the Congo to act as a trade representative for England. There, he clashes with a greedy Belgian captain who has sinister plans for his old home."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8602240680589261112&width=180&height=240", "title": "Moonlight", "year": 2016, "starRating": 3, "mediumSynopsis": "This evocative drama charts the life of a black gay youth named Chiron as he grows up in a rough neighborhood in Miami. As a boy, Chiron is taken in by a kindhearted drug dealer and his girlfriend. Later, he risks falling into a life of crime himself."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8611481501342167112&width=180&height=240", "title": "Ghostbusters (Extended Edition)", "year": 2016, "starRating": 3, "mediumSynopsis": "In this thrilling and hilarious reboot of the beloved sci-fi-comedy franchise, two paranormal researchers join forces with a nuclear engineer and a subway attendant to fight off a slew of ghosts that have invaded New York City. Eventually, they come face-to-face with an evil entity who can control human beings."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8525780066215312112&width=180&height=240", "title": "Hail, Caesar!", "year": 2016, "starRating": 3, "mediumSynopsis": "This outlandish comedy set in the golden age of showbiz centers on a slick Hollywood fixer named Eddie Mannix, who is pressed into action when a superstar actor is kidnapped and held for ransom. Mannix must race to quietly collect the ransom money before the gossip mags catch wind of the scandal."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8758522316428539112&width=180&height=240", "title": "Eva Hesse", "year": 2016, "starRating": 3, "mediumSynopsis": "This engaging documentary profiles Eva Hesse, a pioneer in postminimal art who was known for her use of plastics in sculptures. Although she enjoyed success during the 1960s, her career was tragically cut short when she died of a brain tumor in 1970 at the age of 34."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8602791843657846112&width=180&height=240", "title": "Weiner", "year": 2016, "starRating": 3, "mediumSynopsis": "This riveting behind-the-scenes documentary follows former congressman Anthony Weiner as he runs for mayor of New York City in 2013. During the campaign, he becomes embroiled in a second widely publicized sexting scandal, which ultimately derails his once-promising political career."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8743595776572224112&width=180&height=240", "title": "Richard Linklater: Dream is Destiny", "year": 2016, "starRating": 3, "mediumSynopsis": "This intimate look at the career of director Richard Linklater includes behind-the-scenes footage and interviews with the filmmaker himself, ultimately exploring how his humble DIY beginnings in Texas led to a host of innovative and iconic movies."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8562248804963466112&width=180&height=240", "title": "Moana", "year": 2016, "starRating": 3, "mediumSynopsis": "Young navigator Moana teams with demigod Maui to locate a legendary island, and together the pair explore fantastical lands and encounter incredible sea creatures."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8396604764875510112&width=180&height=240", "title": "Don't Think Twice", "year": 2016, "starRating": 3, "mediumSynopsis": "In this hilarious, bittersweet comedy about trying to make it in showbiz, the members of an NYC improv troupe are forced to reflect on their failures when one of their own lands a plum role on a hugely popular TV show."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8458385962102075112&width=180&height=240", "title": "Manchester by the Sea", "year": 2016, "starRating": 3, "mediumSynopsis": "A hardened handyman returns to his hometown to care for his 16-year-old nephew, but his arrival unearths a checkered history."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8601714594537362112&width=180&height=240", "title": "Everybody Wants Some!!", "year": 2016, "starRating": 3, "mediumSynopsis": "In this hilarious comedy set in 1980 Texas, the members of a college baseball team crash one party after the next in search of a good time. Meanwhile, a freshman addition to the squad finds himself falling for an artsy student."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8420041394247284112&width=180&height=240", "title": "The Eagle Huntress", "year": 2016, "starRating": 3, "mediumSynopsis": "This inspiring documentary profiles a 13-year-old Mongolian girl  who strives to become the first female in her culture to learn to hunt alongside a trained eagle. As she prepares for an annual eagle-hunting competition, she must also deal with the disapproval of several tribal elders."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8304470204543565112&width=180&height=240", "title": "Equity", "year": 2016, "starRating": 3, "mediumSynopsis": "A senior investment banker tries to prove her worth to her firm by bringing in a tech company that's on the verge of going public. However, the IPO causes her to get tangled up in an investigation into securities fraud in this intense drama."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8139424310197637112&width=180&height=240", "title": "Ghostbusters", "year": 2016, "starRating": 3, "mediumSynopsis": "In this thrilling and hilarious reboot of the beloved sci-fi-comedy franchise, two paranormal researchers join forces with a nuclear engineer and a subway attendant to fight off a slew of ghosts that have invaded New York City. Eventually, they come face-to-face with an evil entity who can control human beings."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8299484957291084112&width=180&height=240", "title": "A Beautiful Planet", "year": 2016, "starRating": 3, "mediumSynopsis": "This stunning documentary explores humanity's impact on the Earth via footage shot from the International Space Station. The film shows the gradual progression of events such as the deforestation of the Amazon and the melting of glaciers in Greenland."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7762675461312278112&width=180&height=240", "title": "The Edge of Seventeen", "year": 2016, "starRating": 3, "mediumSynopsis": "A narcissistic high schooler named Nadine is horrified when her best friend starts dating her impossibly perfect brother. Soon, she falls into a downward spiral that forces her to reflect on her cruel behavior in this intelligent coming-of-age story."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7877089714557497112&width=180&height=240", "title": "Caf?? Society", "year": 2016, "starRating": 3, "mediumSynopsis": "In this charming comedy-drama set in the 1930s, a New Yorker named Bobby moves to Hollywood to work for his uncle Phil, a powerful agent. He soon falls for Phil's secretary Vonnie, unaware that she's secretly having an affair with his uncle. In time, a disillusioned Bobby returns home to run a nightclub for his gangster brother."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7712845027477000112&width=180&height=240", "title": "Kevin Hart: What Now?", "year": 2016, "starRating": 3, "mediumSynopsis": "Comedian Kevin Hart returns to his hometown of Philadelphia to perform in front of a record-setting, sold-out crowd at the Lincoln Financial Field in this hilarious stand-up film. The movie contains both footage of the show and short skits."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7799263767623842112&width=180&height=240", "title": "Boom Bust Boom", "year": 2016, "starRating": 3, "mediumSynopsis": "This thought-provoking documentary explores the global economic system and the history of financial crashes via interviews with experts, animated segments, puppetry and songs."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7655404570056424112&width=180&height=240", "title": "Sausage Party", "year": 2016, "starRating": 3, "mediumSynopsis": "After they learn the horrifying truth about what happens when they are purchased, a misplaced sausage and his food friends embark on an adventure through the aisles of a supermarket in this hilariously raunchy animated comedy."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7693697111333817112&width=180&height=240", "title": "The Innocents", "year": 2016, "starRating": 3, "mediumSynopsis": "In this shattering historical drama set in 1945 Warsaw, a French Red Cross doctor is called to a convent on an urgent matter. Once there, she helps a nun give birth and discovers that several other women at the monastery are also pregnant."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7508843610151727112&width=180&height=240", "title": "Jim: The James Foley Story", "year": 2016, "starRating": 3, "mediumSynopsis": "This heartrending documentary profiles journalist James Foley, who was kidnapped in Syria in 2012 and became the first U.S. citizen to be killed by the terrorist group ISIS. Friends, family and colleagues share their recollections of him in this film."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7506359162295718112&width=180&height=240", "title": "Hands of Stone", "year": 2016, "starRating": 3, "mediumSynopsis": "This ultra-intense biopic about boxing legend Roberto Duran follows his rise from a two-fisted street urchin in Panama to a gifted amateur known for Round 1 knockouts. Along the way he gains fame, riches and the love of a woman named Felicidad, but a chance meeting with boxing coach Ray Arcel takes his skills to a level where he can defeat American champion Sugar Ray Leonard."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7476091638108534112&width=180&height=240", "title": "Indignation", "year": 2016, "starRating": 3, "mediumSynopsis": "A young Jewish atheist attends college in 1951 Ohio, where he clashes with the school's established social order and his parents' hopes for his future. At the same time, he falls for an attractive, complicated classmate in this captivating period drama."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7111921004342965112&width=180&height=240", "title": "Zootopia", "year": 2016, "starRating": 3, "mediumSynopsis": "In this clever and hilarious animated adventure set in a city inhabited by anthropomorphic animals, an uptight rabbit police officer is forced to work with a charismatic fox con artist in order to get to the bottom of a major case involving the disappearance of carnivorous citizens."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7357236286390468112&width=180&height=240", "title": "Eat That Question: Frank Zappa in His Own Words", "year": 2016, "starRating": 3, "mediumSynopsis": "This electrifying documentary explores the life and career of avant-garde musician Frank Zappa entirely via archival footage of the man, including interviews and concert performances."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7271977629021662112&width=180&height=240", "title": "Finding Dory", "year": 2016, "starRating": 3, "mediumSynopsis": "In this delightful sequel, amnesiac blue tang Dory decides to search for her long-lost parents. With the help of young clown fish Nemo and his dad Marlin, she heads for California and the Monterey Marine Life Institute, evading predators along the way as she hopes to find a place she can call home."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7285325391873751112&width=180&height=240", "title": "10 Cloverfield Lane", "year": 2016, "starRating": 3, "mediumSynopsis": "In this chilling sci-fi thriller, a young woman awakens from a car accident in a basement shelter, where two men inform her that a chemical attack has rendered the outside world uninhabitable. As the dynamics within the bunker shift, she begins to question her situation."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7170365799037437112&width=180&height=240", "title": "Swiss Army Man", "year": 2016, "starRating": 3, "mediumSynopsis": "In this quirky adventure comedy, a man stranded alone on a deserted island makes one last attempt at escape after an unusual dead body washes up on shore. The talking corpse provides the castaway with a number of unexpected tools, which he'll need if he wants to be reunited with his love."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7259677958404977112&width=180&height=240", "title": "Captain America: Civil War", "year": 2016, "starRating": 3, "mediumSynopsis": "Former teammates Iron Man and Captain America clash over a proposal that would make the Avengers accountable to government oversight. Soon, the rest of the Marvel heroes take sides in the conflict in this thrillingly epic comic-book adventure."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6963196742922762112&width=180&height=240", "title": "Allied", "year": 2016, "starRating": 3, "mediumSynopsis": "Two spies fall in love during World War II."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6935712314105374112&width=180&height=240", "title": "Hunt for the Wilderpeople", "year": 2016, "starRating": 3, "mediumSynopsis": "A rebellious teenage orphan and his reluctant caretaker survive in the New Zealand wilderness after the former attempts to run away from his foster home. Meanwhile, a nationwide manhunt is launched to find the two in this moving coming-of-age dramedy."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6913507184603776112&width=180&height=240", "title": "Zero Days", "year": 2016, "starRating": 3, "mediumSynopsis": "This riveting documentary about cyberwarfare explores how a computer virus called Stuxnet, which was allegedly created by the United States and Israel to shut down an Iranian nuclear facility, has ushered in a new era of international conflict."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6901359660903831112&width=180&height=240", "title": "Sing Street", "year": 2016, "starRating": 3, "mediumSynopsis": "In this heartwarming nostalgia trip for the MTV generation, a 14-year-old boy living in a working-class neighborhood in 1985 Dublin forms a glam-rock-inspired band with a group of fellow misfits. At the same time, he falls for a beautiful woman who agrees to star in their music videos."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6885352326184301112&width=180&height=240", "title": "Mapplethorpe: Look at the Pictures", "year": 2016, "starRating": 3, "mediumSynopsis": "This revealing documentary profiles iconic and controversial photographer Robert Mapplethorpe via interviews with his family and lovers, examinations of his work and rediscovered footage of the late artist."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6890216065676812112&width=180&height=240", "title": "Race", "year": 2016, "starRating": 3, "mediumSynopsis": "In this exhilarating drama based on true events, legendary black Olympian Jesse Owens competes in track and field at the 1936 Games in Nazi Germany, despite the host country's attempts to turn the event into a celebration of Aryan supremacy."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6857790288066661112&width=180&height=240", "title": "The Infiltrator", "year": 2016, "starRating": 3, "mediumSynopsis": "In this incredible crime drama based on true events, federal agent Robert Mazur goes undercover as a money-laundering businessman in an attempt to bring down Pablo Escobar's Medell??n Cartel in the 1980s."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6774435697143692112&width=180&height=240", "title": "Neon Bull", "year": 2016, "starRating": 3, "mediumSynopsis": "In this poetic drama, a cowboy competing on the Brazilian rodeo circuit dreams of getting into fashion design. At the same time, he flirts with an exotic dancer who also performs for the rodeo."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6702841468732010112&width=180&height=240", "title": "Don't Breathe", "year": 2016, "starRating": 3, "mediumSynopsis": "Three friends plot to end their money woes by burglarizing the home of a blind recluse. However, the heist quickly goes awry in this disturbing horror thriller when they discover that their target is concealing a horrifying secret."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6659906995778624112&width=180&height=240", "title": "Miss Sloane", "year": 2016, "starRating": 3, "mediumSynopsis": "An uncompromising political fixer takes on the powerful gun lobby in the wake of several mass shootings, but her mission quickly becomes a frustrating ordeal that threatens to derail her career."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6625114139620615112&width=180&height=240", "title": "The BFG", "year": 2016, "starRating": 3, "mediumSynopsis": "A lonely orphan befriends a \"big friendly giant,\" and together the pair explore a magical world and collect dreams in this wondrous adaptation of the beloved children's novel. Later, they try to warn the Queen of England about the threat posed by the other giants, who, unlike the vegetarian BFG, eat children."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6628421294985438112&width=180&height=240", "title": "Star Trek Beyond", "year": 2016, "starRating": 3, "mediumSynopsis": "This engaging sci-fi sequel finds Capt. Kirk and the crew of the Enterprise facing off against a dictator named Krall. When an assault by Krall leads to the destruction of their starship, the team end up marooned on a remote planet inhabited by aliens both hostile and helpful."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6609671429306942112&width=180&height=240", "title": "Wiener-Dog", "year": 2016, "starRating": 3, "mediumSynopsis": "A dachshund is taken in by a veterinary technician, who soon sets off on a road trip. The lovable dog also encounters a young boy, a film professor and a troubled grandmother and granddaughter in this darkly amusing comedy-drama."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6577736360789828112&width=180&height=240", "title": "The Nice Guys", "year": 2016, "starRating": 3, "mediumSynopsis": "In this absolutely hysterical action buddy comedy set in 1970s Los Angeles, a bumbling private eye and an enforcer-for-hire team up to find a missing woman with ties to the porn industry. In time, their sleuthing reveals a far-reaching conspiracy involving corruption in the federal government."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6561732277400581112&width=180&height=240", "title": "Middle School: The Worst Years of My Life", "year": 2016, "starRating": 3, "mediumSynopsis": "Budding young artist Rafe transfers to a new middle school, where the principal quickly punishes him for his failure to conform by destroying a book of his drawings. Rafe then decides to fight back by breaking every rule in school in this wacky comedy."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6382676749054784112&width=180&height=240", "title": "Batman v Superman: Dawn of Justice", "year": 2016, "starRating": 3, "mediumSynopsis": "Batman and Superman clash over differing philosophies about what kind of heroism is needed to protect the world in this soaring comic-book extravaganza. However, the duo are soon forced to confront an even greater threat created by Lex Luthor."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6555713970817799112&width=180&height=240", "title": "The Confirmation", "year": 2016, "starRating": 3, "mediumSynopsis": "In this winsome comedy, a down-on-his-luck carpenter spends time with his 8-year-old son while his ex-wife and her new husband attend a religious retreat. When his toolbox is stolen, the two set off on an adventure to find the thieves responsible, and end up bonding in the process."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6446570946427495112&width=180&height=240", "title": "Pete's Dragon", "year": 2016, "starRating": 3, "mediumSynopsis": "In this enchanting fantasy for the whole family, a boy lives in the woods with a dragon as his caregiver, until a forest ranger finds and adopts him. However, his newfound happiness is threatened by a man who wants to hunt down his magical friend."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6454519436076534112&width=180&height=240", "title": "Kubo and the Two Strings", "year": 2016, "starRating": 3, "mediumSynopsis": "In this gorgeous stop-motion animation inspired by origami and Japanese folklore, a young boy named Kubo embarks on a journey to learn the truth about his missing father. Along the way, he battles the vengeful Moon King and two evil twin sisters with his shamisen, a magical stringed instrument."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6049062857376924112&width=180&height=240", "title": "American Honey", "year": 2016, "starRating": 3, "mediumSynopsis": "In this visually stunning coming-of-age drama, an Oklahoma teen named Star joins a crew of young salespeople who are hawking magazine subscriptions across the Midwest. Along the way, she falls for a charismatic coworker."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6331127800592245112&width=180&height=240", "title": "Gleason", "year": 2016, "starRating": 3, "mediumSynopsis": "Deeply emotional portrait of retired NFL player Steve Gleason and his battle with ALS, as the former New Orleans Saint pledges to live a life of inspiration for his wife and newborn son."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=6315014054275623112&width=180&height=240", "title": "Florence Foster Jenkins", "year": 2016, "starRating": 3, "mediumSynopsis": "Heiress Florence Foster Jenkins longs to become an opera star in 1940s New York, despite possessing a horrible singing voice. With the help of her husband and a talented musician, she finds a strange kind of success in this heartwarming biopic."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5824382903979232112&width=180&height=240", "title": "Denial", "year": 2016, "starRating": 3, "mediumSynopsis": "After accusing fellow historian David Irving of being a Holocaust denier, Deborah Lipstadt is sued for libel and forced to provide proof of her claims in court. This gripping drama is based on a real-life legal case, which reached a verdict in 2000."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5803945251790545112&width=180&height=240", "title": "Popstar: Never Stop Never Stopping", "year": 2016, "starRating": 3, "mediumSynopsis": "A hugely popular rapper faces a career meltdown when his latest album tanks and his attempts to rehab his image only end in disaster. In time, he considers reuniting with his old rap trio, the Style Boyz, in this hysterical, fast-paced mockumentary."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5362695626670385112&width=180&height=240", "title": "The Jungle Book", "year": 2016, "starRating": 3, "mediumSynopsis": "In this visually stunning adaptation of the classic tales by Rudyard Kipling, a panther leads an orphaned human boy on a trek through the jungle in order to reunite him with his kind. Along the way, the boy encounters a lazy bear and a devious snake, as well as an orangutan who dreams of controlling fire."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5399045617259817112&width=180&height=240", "title": "Nocturnal Animals", "year": 2016, "starRating": 3, "mediumSynopsis": "An art-gallery owner reads a novel written by her ex-husband, and becomes greatly disturbed by the possibility that the story was inspired by their marriage."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5489339141666941112&width=180&height=240", "title": "The Conjuring 2", "year": 2016, "starRating": 3, "mediumSynopsis": "In this terrifying horror sequel, husband-and-wife paranormal investigators Ed and Lorraine Warren help a single mother living in 1977 London, who claims that she and her children are being terrorized by supernatural forces."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5377275663719253112&width=180&height=240", "title": "Mike and Dave Need Wedding Dates", "year": 2016, "starRating": 3, "mediumSynopsis": "Two hard-partying ladies see a viral video in which unruly brothers plead for dates for their sister's wedding in Hawaii, and decide to pose as the angels they're looking for in order to score a free trip in this incredibly raunchy comedy."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5339358993383812112&width=180&height=240", "title": "Blood Father", "year": 2016, "starRating": 3, "mediumSynopsis": "This gritty action thriller follows an ex-con tattoo artist as he fights to protect his estranged teenage daughter, who is being hunted by a Mexican drug cartel after getting mixed up in her boyfriend's criminal schemes."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5326300760595850112&width=180&height=240", "title": "Ghostbusters 3D", "year": 2016, "starRating": 3, "mediumSynopsis": "In this thrilling and hilarious reboot of the beloved sci-fi-comedy franchise, two paranormal researchers join forces with a nuclear engineer and a subway attendant to fight off a slew of ghosts that have invaded New York City. Eventually, they come face-to-face with an evil entity who can control human beings."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5318339286252990112&width=180&height=240", "title": "Zootopia: An IMAX 3D Experience", "year": 2016, "starRating": 3, "mediumSynopsis": "In this clever and hilarious animated adventure set in a city inhabited by anthropomorphic animals, an uptight rabbit police officer is forced to work with a charismatic fox con artist in order to get to the bottom of a major case involving the disappearance of carnivorous citizens."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5293119023010388112&width=180&height=240", "title": "Heart of a Dog", "year": 2016, "starRating": 3, "mediumSynopsis": "This experimental documentary serves as avant-garde artist Laurie Anderson's ode to her late dog, intercut with ruminations on life and death."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5235796640196430112&width=180&height=240", "title": "War Dogs", "year": 2016, "starRating": 3, "mediumSynopsis": "Two down-on-their-luck pals become arms dealers, but get in over their heads when they land a $300 million contract with the U.S. government to supply weaponry to forces in Afghanistan. This raucous comedy-drama is based on true events."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5191146139464456112&width=180&height=240", "title": "Trapped", "year": 2016, "starRating": 3, "mediumSynopsis": "This illuminating documentary takes a look at how \"TRAP\" laws, intended to set safety standards in abortion clinics, are used to intimidate patients and pressure providers into closing their doors."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=5081274691667434112&width=180&height=240", "title": "Life, Animated", "year": 2016, "starRating": 3, "mediumSynopsis": "Profiling an autistic young man who learned how to communicate with others and understand the world around him by repeatedly watching Disney movies. This uplifting documentary also turns his fan fiction about Disney sidekicks into an animated work."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4989950345440260112&width=180&height=240", "title": "X-Men: Apocalypse", "year": 2016, "starRating": 3, "mediumSynopsis": "In this action-packed comic-book adventure set in the 1980s, the X-Men are forced to confront an ancient mutant called Apocalypse. After the resurrected villain recruits four superpowered followers, Professor X and his charges attempt to stop them."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4905665202785919112&width=180&height=240", "title": "Sully", "year": 2016, "starRating": 3, "mediumSynopsis": "This inspiring biopic of airline pilot Chesley \"Sully\" Sullenberger depicts his successful emergency landing of an Airbus A320 on the Hudson River in January 2009. In the aftermath of this unprecedented feat, he must endure the weight of sudden fame, second-guessing by investigators and his own doubts about his actions that fateful day."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4785961324434883112&width=180&height=240", "title": "The Birth of a Nation", "year": 2016, "starRating": 3, "mediumSynopsis": "This searing historical drama recounts a real-life slave revolt that occurred in 1831 Virginia, led by a black preacher named Nat Turner. Turner is so appalled by the horrors he sees while sermonizing that he is moved to fight back."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=9193050610162375112&width=180&height=240", "title": "The Boss", "year": 2016, "starRating": 2, "mediumSynopsis": "A hugely successful businesswoman is convicted of insider trading and sentenced to prison in this uproarious comedy. After being released, she tries to earn redemption by helping a group of young girls in their quest to sell brownies."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4769892962522613112&width=180&height=240", "title": "Captain Fantastic", "year": 2016, "starRating": 3, "mediumSynopsis": "In this charming comedy-drama, a father raises his six children in a forest in the Pacific Northwest. But when a family tragedy prompts them to take a road trip to New Mexico, the kids are forced to interact with the outside world for the first time."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4778681084741288112&width=180&height=240", "title": "Midnight Special", "year": 2016, "starRating": 3, "mediumSynopsis": "In this captivating sci-fi adventure, Roy rescues his son Alton from a cult in Texas, whose members worship the boy for his supernatural powers. Along with a state trooper, the pair go on a cross-country journey as they are hunted by federal agents, who believe Alton might be a threat to national security."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8910132086501749112&width=180&height=240", "title": "How to Be Single", "year": 2016, "starRating": 2, "mediumSynopsis": "In this hilarious and heartfelt rom com, four women with vastly different ideas about love and relationships navigate the single life of New York City. Two friends set out on a journey of self-discovery, while a career gal struggles with settling down and an uptight romantic searches for her perfect match."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=4620971469623780112&width=180&height=240", "title": "Little Men", "year": 2016, "starRating": 3, "mediumSynopsis": "In this deeply humane drama, two boys living in gentrifying Brooklyn become unlikely friends. However, their bond is tested when their parents get into a bitter argument over the rising cost of rent."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=9101287443118298112&width=180&height=240", "title": "Hillsong - Let Hope Rise", "year": 2016, "starRating": 2, "mediumSynopsis": "This uplifting documentary traces the history of Australia-based Christian worship band Hillsong United, from their humble beginnings in a tiny church outside of Sydney to their success as a thriving international ministry."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8892298931485089112&width=180&height=240", "title": "Keanu", "year": 2016, "starRating": 2, "mediumSynopsis": "Two bumbling friends pose as drug dealers in order to retrieve a stolen cat."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8928070016886012112&width=180&height=240", "title": "Snowden", "year": 2016, "starRating": 2, "mediumSynopsis": "Searing docudrama about whistle-blower Edward Snowden, who decided to leak classified information from the NSA in order to expose a massive, covert surveillance program orchestrated by the U.S. government. The film traces Snowden's career in both the NSA and CIA as he becomes disillusioned with his work and receives support from his idealistic girlfriend."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8880094142635630112&width=180&height=240", "title": "The Boss (Unrated)", "year": 2016, "starRating": 2, "mediumSynopsis": "A hugely successful businesswoman is convicted of insider trading and sentenced to prison in this uproarious comedy. After being released, she tries to earn redemption by helping a group of young girls in their quest to sell brownies."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8750231666924120112&width=180&height=240", "title": "The Blackout Experiments", "year": 2016, "starRating": 2, "mediumSynopsis": "An in-depth look at an interactive horror show known as \"Blackout,\" in which willing participants are subjected to terrifying experiences. This documentary profiles those who repeatedly engage in Blackout, examining what motivates them to do so."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8653469722626620112&width=180&height=240", "title": "Prescription Thugs", "year": 2016, "starRating": 2, "mediumSynopsis": "A fascinating look at prescription-drug abuse and the role that the pharmaceutical industry and doctors play in perpetuating it. Industry whistle-blowers and rehabilitation experts share their assessment of the situation."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8781699274557142112&width=180&height=240", "title": "Hell or High Water", "year": 2016, "starRating": 2, "mediumSynopsis": "In this riveting crime drama, two desperate brothers commit a string of bank robberies in order to raise the money needed to protect their family farm from foreclosure. Meanwhile, a sheriff tracks the heists in an attempt to hunt down those responsible."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8793714922558128112&width=180&height=240", "title": "Tony Robbins: I Am Not Your Guru", "year": 2016, "starRating": 2, "mediumSynopsis": "This inspiring documentary profiles motivational speaker Tony Robbins as he holds an annual seminar known as \"Date With Destiny\" in Boca Raton, Fla. During the event, Robbins encourages attendees to confront their issues and take charge of their lives."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8701469078200407112&width=180&height=240", "title": "Suicide Squad", "year": 2016, "starRating": 2, "mediumSynopsis": "In this wild and anarchic \"super-antihero\" film, a team of incarcerated villains, including Deadshot, Harley Quinn, Enchantress, El Diablo and Killer Croc, are recruited by the government for a dangerous mission in exchange for reduced sentences."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8797614352598318112&width=180&height=240", "title": "Me Before You", "year": 2016, "starRating": 2, "mediumSynopsis": "In this tearjerking romantic drama, a young woman acts as a caregiver for a banker who was paralyzed in an accident. Her no-nonsense ways force him to reconnect with life, and the pair eventually develop feelings for each other."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8638271398883651112&width=180&height=240", "title": "Jane Wants a Boyfriend", "year": 2016, "starRating": 2, "mediumSynopsis": "In this deeply romantic comedy-drama, a lonely autistic woman falls for a charming chef. However, her caring but protective sister has misgivings about their relationship."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8612723068152472112&width=180&height=240", "title": "Joshy", "year": 2016, "starRating": 2, "mediumSynopsis": "After his engagement falls apart, Josh and four of his hard-living friends decide to go through with the plans for the bachelor party in an attempt to cope. This hilarious mumblecore comedy was mostly improvised by the actors."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8676478453025596112&width=180&height=240", "title": "Ice Age: Collision Course", "year": 2016, "starRating": 2, "mediumSynopsis": "Bumbling squirrel Scrat accidentally sends an asteroid hurtling toward Earth, which forces Manny the woolly mammoth, Sid the sloth and Diego the saber-toothed tiger to embark on a journey to save the planet in this winning animated sequel."
    }
    ,
    {
        "url": "http://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=8599560622616351112&width=180&height=240", "title": "Jack Reacher: Never Go Back", "year": 2016, "starRating": 2, "mediumSynopsis": "Jack Reacher returns in this thrill-a-minute sequel, which finds him working to exonerate Maj. Susan Turner after she is accused of treason. However, his quest causes him to get tangled up in a conspiracy involving the murder of soldiers."
    }
    ]
}

const programs = Object.assign(
    {},
    data,
    { programs: data.programs.map((vod, i) => Object.assign({}, vod, {
        locator: 'http://wp3-pod1-vod-nl-lab5a.lab.cdn.dmdsdp.com/sdash/4dabfa8459872e2cf99f77512ffae474_23ad3f926516eb485cb15873b83a0fc1/index.mpd/Manifest?device=HEVC-STB',
        refId: `vod#${i}`,
        url: 'https://cdn.pbrd.co/images/HrxuHQG.jpg',
        title: `Movie ${i + 1}`,
        year: 2018,
        starRating: 4,
        mediumSynopsis: `Movie ${i + 1} description`,
    })) }
)

px.import("px:scene.1.js").then( function ready(scene) {
    var root=scene.root;
    var tiles=[];
    var font=scene.create( {
        t: "fontResource", url: "http://www.pxscene.org/examples/px-reference/fonts/IndieFlower.ttf"
    }
    );
    //var fontFeatured = scene.create({t:"fontResource",url:"http://www.pxscene.org/examples/px-reference/fonts/FontdinerSwanky.ttf"});
    var fontDesc=scene.create( {
        t: "fontResource", url: "http://www.pxscene.org/examples/px-reference/fonts/DejaVuSans.ttf"
    }
    );
    var starImage=scene.create( {
        t: "imageResource", url: "http://www.pxscene.org/examples/px-reference/gallery/images/gold_star.png"
    }
    );
    root.a=0;
    // container
    var s=scene.create( {
        t: "rect", fillColor: 0x00000080, w: 1280, h: 720, parent: root, clip: true
    }
    );
    // sliding view for scrolling
    var cf=scene.create( {
        t: "rect", parent: s
    }
    );
    var w=180;
    var h=240;
    var top=80;
    var progs=programs.programs;
    var sparkleUrl="http://www.pxscene.org/examples/px-reference/gallery/images/sparkle_small.png";
    var maskUrl="http://www.pxscene.org/examples/px-reference/gallery/images/postermask2.png";
    var title=scene.create( {
        t: "textBox", w: w*1.5, h: 200, parent: s, y: top+(h*1.25), pixelSize: 25, textColor: 0xffffffff, font: font, alignHorizontal: scene.alignHorizontal.CENTER, wordWrap: true, clip: true, leading: -10, truncation: scene.truncation.TRUNCATE_AT_WORD
    }
    );
    var titleY=top+(h*1.25);
    var dtlVisible=false;
    var starHolder=scene.create( {
        t: "rect", parent: s, w: 75, h: 15, y: top+(h*1.25)+60, a: 0, fillColor: 0x000000f00
    }
    );
    var stars=[];
    var maxStars=5;
    var starWidth=20;
    var starHeight=20;
    for(var i=0;
    i < maxStars;
    i++) {
        stars[i]=scene.create( {
            t: "image", parent: starHolder, x: i*starWidth, y: 0, w: 1, h: 1, cx: starWidth*0.5, cy: starHeight*0.5, resource: starImage, a: 0, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
        }
        );
    }
    function anim(starNum, total, starX) {
        //console.log("starNum "+starNum);
        if( starNum < total) {
            // Animate the stars into view
            stars[starNum].animateTo( {
                a: 1, w: starWidth, h: starHeight
            }
            , 0.5, scene.animation.EASE_IN_BOUNCE, scene.animation.LOOP, 1);
            // Spin the stars
            stars[starNum].animateTo( {
                r: 360
            }
            , 60, scene.animation.TWEEN_LINEAR, scene.animation.LOOP, scene.animation.COUNT_FOREVER);
            starNum++;
            if( dtlVisible===true) {
                // resetStars and short-circuit animation because
                // detail is visible
                resetStars();
                return;
            }
            else {
                anim(starNum, total, starX);
            }
        }
    }
    function animStars(starY, starX, selection) {
        var numStars=progs[selection].starRating;
        // Animate the starHolder into place
        starHolder.animateTo( {
            a: 1, y: starY, x: starX-((numStars*starWidth)/2)
        }
        , 0.2, scene.animation.TWEEN_LINEAR, scene.animation.LOOP, 1);
        anim(0, numStars, starX);
    }
    function resetStars() {
        starHolder.animateTo( {
            a: 0
        }
        , 0.1, scene.animation.TWEEN_STOP, scene.animation.LOOP, 1);
        for(var i=0;
        i <maxStars;
        i++) {
            stars[i].h=1;
            stars[i].w=1;
            stars[i].a=0;
            stars[i].r=0;
        }
    }
    var imagePromises=[];
    var len=progs.length;
    for(var i=0;
    i <=min(100, len);
    i++) {
        var url=progs[i].url;
        var res=scene.create( {
            t: "imageResource", url: url
        }
        );
        if( i >=0 && i <=15) imagePromises[i]=res.ready;
        // tile background - failed image load
        var t=scene.create( {
            t: "rect", y: top, parent: cf, w: w, h: h, cx: w/2, cy: h/2, ry: 1, rz: 0, fillColor: 0x00000070
        }
        );
        // tile image
        var ti=scene.create( {
            t: "image", resource: res, parent: t, w: w, h: h, cx: w/2, cy: h/2, id: "image"
        }
        );
        // reflection
        var tr=scene.create( {
            t: "image", parent: ti, w: w, h: h, cx: w/2, cy: h, rx: 1, rz: 0, r: 180, sx: 1.0, sy: 0.5,
        }
        );
        var tr2=scene.create( {
            t: "image", resource: res, parent: tr, w: w, h: h, a: 0.1
        }
        );
        // reflection masking... big perf hit so flipped off for now
        //var trm = scene.create({t:"image",url:maskUrl,parent:tr,y:200,w:w,h:40,draw:false,mask:true});
        if (Math.random() < 0.3) {
            var ts=scene.create( {
                t: "image", url: sparkleUrl, x: w-40, y: -20, w: 64, h: 64, cx: 32, cy: 32, parent: ti, id: "sparkle"
            }
            );
            ts.animateTo( {
                r: 360
            }
            , 30, scene.animation.TWEEN_LINEAR, scene.animation.LOOP, scene.animation.COUNT_FOREVER);
        }
        // in-order tiles
        tiles.push(t);
    }
    Promise.all(imagePromises).then(function() {
        for (var i=15;
        i >=0;
        i--) {
            tiles[i].moveToFront();
        }
        root.a=1;
    }
    );
    // Detail widgets
    var dtl=scene.create( {
        t: "rect", parent: root, y: 0, w: 1000, h: 400, sx: 0.01, sy: 0.01, fillColor: 0x121212d0, lineColor: 0xefefefff, lineWidth: 3, a: 0, clip: true
    }
    );
    var dtlBevel=scene.create( {
        t: "rect", parent: dtl, x: 3, y: 3, w: 994, h: 394, fillColor: 0xffffff00, lineColor: 0xe0e0e0d0, lineWidth: 3
    }
    );
    var dtlImage=scene.create( {
        t: "image", parent: dtl, w: 444, h: 333, y: 25, x: 25
    }
    );
    var dtlTitle=scene.create( {
        t: "textBox", parent: dtl, x: 500, w: 500, h: 300, y: 28, wordWrap: true, pixelSize: 40, font: font, leading: -10, textColor: 0xffffffff, truncation: scene.truncation.TRUNCATE_AT_WORD
    }
    );
    var dtlFeaturedRect=scene.create( {
        t: "rect", parent: dtl, fillColor: 0xf8101080, x: -10, y: 80, w: 200, h: 30, cx: 32, cy: 32, r: -45, a: 0
    }
    );
    var dtlFeaturedText=scene.create( {
        t: "text", parent: dtlFeaturedRect, text: "FEATURED!", x: 20, y: -3, w: 64, h: 30, pixelSize: 30, font: font, textColor: 0xffffffff
    }
    );
    var dtlCont=scene.create( {
        t: "rect", parent: dtl, x: 500, w: 500
    }
    );
    var rtgCont=scene.create( {
        t: "rect", parent: dtlCont, x: 0, y: 0, w: 100, h: 20, fillColor: 0xc0c0c000, clip: true
    }
    );
    var dtlRating1=scene.create( {
        t: "image", parent: rtgCont, x: 0, y: 0, w: 20, h: 20, resource: starImage, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
    }
    );
    var dtlRating2=scene.create( {
        t: "image", parent: rtgCont, x: 20, y: 0, w: 20, h: 20, resource: starImage, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
    }
    );
    var dtlRating3=scene.create( {
        t: "image", parent: rtgCont, x: 40, y: 0, w: 20, h: 20, resource: starImage, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
    }
    );
    var dtlRating4=scene.create( {
        t: "image", parent: rtgCont, x: 60, y: 0, w: 20, h: 20, resource: starImage, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
    }
    );
    var dtlRating5=scene.create( {
        t: "image", parent: rtgCont, x: 80, y: 0, w: 20, h: 20, resource: starImage, stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH
    }
    );
    var dtlDesc=scene.create( {
        t: "textBox", parent: dtlCont, x: 0, w: 450, h: 260, y: 35, font: fontDesc, textColor: 0xffffffff, truncation: scene.truncation.TRUNCATE_AT_WORD, wordWrap: true, pixelSize: 18, leading: 2
    }
    );
    var dtlYear=scene.create( {
        t: "text", parent: dtlCont, font: fontDesc, pixelSize: 15, textColor: 0xffffffff
    }
    );
    //var numTiles = tiles.length;
    //for (var i = numTiles-1; i >= 0; i--)
    //{
    //tiles[i].moveToFront();
    //}
    var selection=0;
    function min(v1, v2) {
        return (v1 < v2)?v1: v2;
    }
    function max(v1, v2) {
        return (v1 > v2)?v1: v2;
    }
    function clamp(v, minVal, maxVal) {
        return min(maxVal, max(minVal, v));
    }
    function updateSelection(oldSelection, newSelection) {
        var x=50;
        var wspace=50;
        var r=45;
        //    var tween = scene.animation.EASE_OUT_ELASTIC;
        var tween=scene.animation.TWEEN_STOP;
        var numTiles=tiles.length;
        for (var i=0;
        i < numTiles;
        i++) {
            var o=tiles[i];
            if (i==newSelection) {
                if (newSelection > 0) x +=w;
                o.moveToFront();
                o.animateTo( {
                    r: 0, sx: 1.5, sy: 1.5, x: x
                }
                , 0.8, tween, scene.animation.LOOP, 1);
                // scroll selection into view
                cf.animateTo( {
                    x: min(0, -(x-(s.w-(3*w))))
                }
                , 0.3, tween, scene.animation.LOOP, 1);
                resetStars();
                title.text=progs[newSelection].title;
                //console.log("title is being set to "+progs[newSelection].title);
                //console.log("title is "+title.text);//progs[newSelection].title);
                var tempX=clamp(min(0, -(x-(s.w-(3*w))))+x-(w*.25), 0, scene.w);
                // Font is already loaded, so we just need to wait on animation
                title.animateTo( {
                    x: tempX
                }
                , 0.3, tween, scene.animation.LOOP, 1).then(function(obj) {
                    var measure=obj.measureText();
                    animStars(measure.bounds.y2, obj.x+((w*1.5)/2), newSelection);
                }
                );
                x +=w+wspace;
            }
            else if (i < newSelection) {
                if (oldSelection==-1 || i==oldSelection) {
                    o.animateTo( {
                        r: -r, sx: 1, sy: 1, x: x
                    }
                    , 0.8, tween, scene.animation.LOOP, 1);
                }
                x+=wspace;
            }
            else if (i > newSelection) {
                if (oldSelection==-1 || i==oldSelection) {
                    o.animateTo( {
                        r: r, sx: 1, sy: 1, x: x
                    }
                    , 0.8, tween, scene.animation.LOOP, 1);
                }
                x+=wspace;
            }
        }
        selection=newSelection;
    }
    function showDetail(detail) {
        dtlImage.url=detail.url.replace("width=180&height=240", "width=444&height=333");
        dtlTitle.text=detail.title;
        dtlDesc.text=detail.mediumSynopsis;
        dtlYear.text=detail.year;
        dtlCont.y=dtlTitle.measureText().bounds.y2;
        console.log("dtlCont.y "+dtlCont.y);
        dtlYear.y=dtlDesc.measureText().bounds.y2+10;
        var rating=detail.starRating;
        //console.log("rating "+rating);
        var size=20*rating;
        //console.log("width "+size);
        rtgCont.w=size;
        // Animate the main container to be translucent
        cf.animateTo( {
            a: 0.3
        }
        , 0.4, scene.animation.TWEEN_STOP, scene.animation.LOOP, 1);
        title.animateTo( {
            a: 0
        }
        , 0.4, scene.animation.TWEEN_STOP, scene.animation.LOOP, 1);
        resetStars();
        //var newX=x-(444/2);
        //dtl.x = 600;//newX;
        dtlVisible=true;
        dtl.animateTo( {
            a: 1, x: 150, y: 200, sx: 1.0, sy: 1.0
        }
        , 0.4, scene.animation.TWEEN_EXP_2, scene.animation.LOOP, 1);
    }
    function hideDetail() {
        dtlVisible=false;
        dtl.animateTo( {
            a: 0, y: 0, x: 600, sx: 0.01, sy: 0.01
        }
        , 0.3, scene.animation.TWEEN_EXP_2, scene.animation.LOOP, 1);
        dtlImage.url="";
        dtlTitle.text="";
        dtlDesc.text="";
        dtlYear.text="";
        cf.animateTo( {
            a: 1.0
        }
        , 0.2, scene.animation.TWEEN_STOP, scene.animation.LOOP, 1);
        title.animateTo( {
            a: 1
        }
        , 0.2, scene.animation.TWEEN_STOP, scene.animation.LOOP, 1);
    }

    global.coverflowKeyHandler = function ({ keyCode, keyType }) {
        if (keyType !== KeyPressTypes.keyDown) return false;
        if (keyCode === Keys.Back) {
            dtlVisible && hideDetail();
            return false;
        }

        var oldSelection=selection;
        var newSelection=selection;

        switch (keyCode) {
            case Keys.Left:
                newSelection=clamp(selection-1, 0, cf.children.length-1);
                if (oldSelection !=newSelection) {
                    updateSelection(oldSelection<=1?-1: oldSelection, newSelection);
                    // hide the detail view if it was showing
                    if(dtlVisible===true) {
                        hideDetail();
                    }
                }
                break;
            case Keys.Right:
                newSelection=clamp(selection+1, 0, cf.children.length-1);
                if (oldSelection !=newSelection) {
                    updateSelection(oldSelection<=1?-1: oldSelection, newSelection);
                    // hide the detail view if it was showing
                    if(dtlVisible===true) {
                        hideDetail();
                    }
                }
                break;
            case Keys.Enter:
                if( dtlVisible===false) {
                    dtlFeaturedRect.a=0;
                    var image=tiles[newSelection].getObjectById("image");
                    //console.log("image is "+image +" url is "+image.url);
                    //console.log("sparkle is "+image.getObjectById("sparkle")+
                    //" url is "+image.getObjectById("sparkle").url);
                    // Why isn't sparkle returned as undefined when it isn't there??
                    var sparkle=image.getObjectById("sparkle");
                    if(image !==null && sparkle !==null && (sparkle.url.length >0)) {
                        dtlFeaturedRect.a=1;
                    }
                    showDetail(progs[newSelection]);
                }
                else {
                    hideDetail();
                }
                break;
            case Keys.PlayPause:
                player.playIP(progs[selection]).then(() => {
                    dtlVisible && hideDetail();
                    navigator.go('/player', progs[selection]);
                });
                break;
            default:
        }

        return true;
    };

    cf.focus=true;
    font.ready.then(function() {
        var numTiles=tiles.length;
        for (var i=numTiles-1;
        i >=0;
        i--) {
            tiles[i].moveToFront();
        }
        updateSelection(-1, 0);
    }
    );
}

);
