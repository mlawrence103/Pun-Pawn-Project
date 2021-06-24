"use strict";

const { db } = require("../server/db");
const {
  models: { Order, User, Pun },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const user1 = await User.create({
    firstName: "Brenda",
    lastName: "Wong",
    email: "brenda.wong@gmail.com",
    password: "123",
    shippingAddressName: "Brenda Wong",
    shippingAddressStreet: "123 Sesame St.",
    shippingAddressCity: "New York City",
    shippingAddressState: "NY",
    shippingAddressZip: "10036",
    billingAddressName: "Brenda Wong",
    billingAddressStreet: "123 Sesame St.",
    billingAddressCity: "New York City",
    billingAddressState: "NY",
    billingAddressZip: "10036",
    userType: "ADMIN",
  });

  const user2 = await User.create({
    firstName: "Cody",
    lastName: "Pug",
    email: "iluvCoffee@pugs.com",
    password: "321",
    userType: "MEMBER",
  });

  const user3 = await User.create({
    firstName: "Luke",
    lastName: "Skywalker",
    email: "blueSaber@jedi.com",
    password: "321",
    userType: "MEMBER",
  });

  const user4 = await User.create({
    firstName: "Inna",
    lastName: "Lynn",
    email: "inna@gmail.com",
    password: "pasaxe",
    shippingAddressName: "Inna Lynn",
    shippingAddressStreet: "987 Sesame St.",
    shippingAddressCity: "Boston",
    shippingAddressState: "MA",
    shippingAddressZip: "02101",
    billingAddressName: "Inna Lynn",
    billingAddressStreet: "987 Sesame St.",
    billingAddressCity: "Boston",
    billingAddressState: "MA",
    billingAddressZip: "02101",
    userType: "ADMIN",
  });

  const user5 = await User.create({
    firstName: "Mabel",
    lastName: "Lawrence",
    email: "mabel@gmail.com",
    password: "pasdagger",
    shippingAddressName: "Mabel Lawrence",
    shippingAddressStreet: "234 Make Believe Ln",
    shippingAddressCity: "New York City",
    shippingAddressState: "NY",
    shippingAddressZip: "10002",
    billingAddressName: "Mabel Lawrence",
    billingAddressStreet: "234 Make Believe Ln",
    billingAddressCity: "New York City",
    billingAddressState: "NY",
    billingAddressZip: "10002",
    userType: "ADMIN",
  });

  const user6 = await User.create({
    firstName: "Ben",
    lastName: "Rodriguez",
    email: "bienvenido@fullstack.com",
    password: "reDUCKs",
    userType: "MEMBER",
  });

  const user7 = await User.create({
    firstName: "Kelsey",
    lastName: "Greene",
    email: "kelsey@fullstack.com",
    password: "reacto",
    userType: "MEMBER",
  });

  //<<<<<PUNS>>>>>//

  const pun1 = await Pun.create({
    content: "Pretty fly for a wifi",
    author: "Ben Rodriguez",
    price: 25,
    quantity: 3,
  });

  const pun2 = await Pun.create({
    content:
      "You're going to await awhile for the seed data as I've used all my seeds to plant trees.",
    author: "Ben Rodriguez",
    price: 500,
    quantity: 1,
  });

  const pun3 = await Pun.create({
    content: "Silence of the lans",
    author: "Ben Rodriguez",
    price: 50,
    quantity: 5,
  });

  const pun4 = await Pun.create({
    content: "Winternet is coming",
    author: "Ben Rodriguez",
    price: 5,
    quantity: 50,
  });

  const pun5 = await Pun.create({
    content: "Wifight the power",
    author: "Ben Rodriguez",
    price: 15,
    quantity: 20,
  });

  const pun6 = await Pun.create({
    content: "Bill Wi the science Fi",
    author: "Ben Rodriguez",
    price: 100,
    quantity: 7,
  });

  const pun7 = await Pun.create({
    content: "Everyday I'm buffering",
    author: "Ben Rodriguez",
    price: 350,
    quantity: 3,
  });

  const pun8 = await Pun.create({
    content: "Wu Tang Lan",
    author: "Ben Rodriguez",
    price: 350,
    quantity: 3,
  });

  const pun9 = await Pun.create({
    content:
      "To prove he was right, the flat-earther walked to the end of the Earth. He eventually came around.",
    price: 350,
    quantity: 3,
  });

  const pun10 = await Pun.create({
    content:
      "What did the cell say when his sister cell stepped on his foot? 'Mitosis.'",
    price: 350,
    quantity: 3,
  });

  const pun11 = await Pun.create({
    content:
      "The other day my friend asked me to pass her lipstick, but I accidentally gave her a glue stick. She still isn't talking to me.",
    price: 350,
    quantity: 3,
  });

  const pun12 = await Pun.create({
    content: "What do you call a witch at the beach? A Sandwich.",
    price: 350,
    quantity: 3,
  });

  const pun13 = await Pun.create({
    content:
      "I have these muscle spasms in my gluteus maximus. My doctor said, 'Weird flex, butt okay.'",
    price: 350,
    quantity: 3,
  });

  const pun14 = await Pun.create({
    content:
      "Why did the koala get rejected? Because he did not have any koalafication.",
    price: 350,
    quantity: 3,
  });

  const pun15 = await Pun.create({
    content:
      "I have a joke about trickle down economics, but 99% of you will never get it.",
    price: 350,
    quantity: 3,
  });

  const pun16 = await Pun.create({
    content:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    price: 350,
    quantity: 3,
  });

  const pun17 = await Pun.create({
    content: "What kind of car did Whitney Houston drive? A Hyundaiiiiiiiiiiii",
    price: 350,
    quantity: 3,
  });

  const pun18 = await Pun.create({
    content:
      "Did you hear about the cheese factory that exploded in France? There was nothing but de brie.",
    price: 350,
    quantity: 3,
  });

  const pun19 = await Pun.create({
    content:
      "A horse walks into a bar. 'Hey,' the Bartender says. 'Sure,' the horse replies.",
    price: 350,
    quantity: 3,
  });

  const pun20 = await Pun.create({
    content: "Mountains aren't just funny. They are hill areas.",
    price: 350,
    quantity: 3,
  });

  const pun21 = await Pun.create({
    content:
      "A Roman walks into a bar, raises 2 fingers, and says to the bartender, 'Five beers, please.'",
    price: 5,
    quantity: 50,
  });

  const pun22 = await Pun.create({
    content:
      "The past, the present and the future walk into a bar. It was tense.",
    price: 5,
    quantity: 50,
  });

  const pun23 = await Pun.create({
    content:
      "I stayed up all night wondering where the sun went. Then it dawned on me.",
    price: 5,
    quantity: 50,
  });

  const pun24 = await Pun.create({
    content:
      "I just got fired from my job at the keyboard factory. I wasn't putting in enough shifts.",
    price: 5,
    quantity: 50,
  });

  const pun25 = await Pun.create({
    content: "I got fired from the calendar factory just for taking a day off.",
    price: 5,
    quantity: 50,
  });

  const pun26 = await Pun.create({
    content: "My chimney didn’t cost anything. It was on the house.",
    price: 5,
    quantity: 50,
  });

  const pun27 = await Pun.create({
    content: "Two silk worms competed in a race. It ended in a tie.",
    price: 5,
    quantity: 50,
  });

  const pun28 = await Pun.create({
    content: "I love whiteboards. They’re re-markable.",
    price: 5,
    quantity: 50,
  });

  const pun29 = await Pun.create({
    content: "I tried to make a belt out of watches. What a waist of time!",
    price: 5,
    quantity: 50,
  });

  const pun30 = await Pun.create({
    content: "Did you hear about the fire at the circus? It was in tents.",
    price: 5,
    quantity: 50,
  });

  const pun31 = await Pun.create({
    content: "What's a computer's favorite beat? An algo-rhythm.",
    price: 5,
    quantity: 50,
  });

  const pun32 = await Pun.create({
    content:
      "What's the difference between a hippo and a zippo? A hippo is really heavy, and a zippo is a little lighter.",
    price: 5,
    quantity: 50,
  });

  const pun33 = await Pun.create({
    content:
      "Yesterday a clown held the door open for me. It was such a nice jester.",
    price: 5,
    quantity: 50,
  });

  const pun34 = await Pun.create({
    content: "I became a vegetarian. It is a big missed steak.",
    price: 800,
    quantity: 35,
  });

  const pun35 = await Pun.create({
    content:
      "An atom lost an electron. It really should have kept an ion them.",
    price: 800,
    quantity: 35,
  });

  const pun36 = await Pun.create({
    content: "The best time is 6:30. Hands down.",
    price: 800,
    quantity: 35,
  });

  const pun37 = await Pun.create({
    content: "Grace Bopper",
    author: "Catherine Mitchell",
    price: 800,
    quantity: 35,
  });

  const pun38 = await Pun.create({
    content: "Have you heard about the beach speaker? It sands great.",
    author: "Catherine Mitchell",
    price: 800,
    quantity: 35,
  });

  const pun39 = await Pun.create({
    content: "My baby lizard is named 'Tiny'. He's my newt.",
    price: 800,
    quantity: 35,
  });

  const pun40 = await Pun.create({
    content: "Accupuncture is a jab well done.",
    price: 800,
    quantity: 35,
  });

  const pun41 = await Pun.create({
    content:
      "Two antennas got married. The ceremony wasn't much, but the reception was excellent.",
    price: 800,
    quantity: 35,
  });

  const pun42 = await Pun.create({
    content: "R.I.P. boiling water. You will be mist.",
    price: 800,
    quantity: 35,
  });

  const pun43 = await Pun.create({
    content: "I tried to eat a clock, but it was too time consuming.",
    price: 800,
    quantity: 35,
  });

  const pun44 = await Pun.create({
    content: "You can't trust atoms. They make up everything.",
    price: 800,
    quantity: 35,
  });

  const pun45 = await Pun.create({
    content:
      "I did a theatrical perfermance about puns. I was a play on words.",
    price: 250,
    quantity: 15,
  });

  const pun46 = await Pun.create({
    content: "I prefer velcro instead of shoe laces. Why knot?",
    price: 250,
    quantity: 15,
  });

  const pun47 = await Pun.create({
    content:
      "I took a pole and found out that 100% of campers were angry when their tent collapsed.",
    price: 250,
    quantity: 15,
  });

  const pun48 = await Pun.create({
    content:
      "I forgot how to throw a boomerang, but it eventually came back to me.",
    price: 250,
    quantity: 15,
  });

  const pun49 = await Pun.create({
    content: "Have you used a broom? It's sweeping the nation!",
    price: 250,
    quantity: 15,
  });

  const pun50 = await Pun.create({
    content: "I tried to draw a circle, but it was pointless.",
    price: 250,
    quantity: 15,
  });

  const pun51 = await Pun.create({
    content: "Velcro... what a rip-off!",
    price: 250,
    quantity: 15,
  });

  const pun52 = await Pun.create({
    content: "Giving away dead batteries, free of charge!",
    price: 250,
    quantity: 15,
  });

  const pun53 = await Pun.create({
    content: "A backwards poet writes inverse.",
    price: 250,
    quantity: 15,
  });

  const pun54 = await Pun.create({
    content:
      "I don't share my bread recipe with just anyone. It's on a knead to know basis.",
    price: 250,
    quantity: 15,
  });

  const pun55 = await Pun.create({
    content:
      "I swallowed some coins, and the doctor said to just wait. No change yet.",
    price: 250,
    quantity: 15,
  });

  const pun56 = await Pun.create({
    content: "My bakery burned down. My business is toast :(",
    price: 250,
    quantity: 15,
  });

  const pun57 = await Pun.create({
    content: "Bad gardeners are rough around the hedges.",
    price: 250,
    quantity: 15,
  });

  const pun58 = await Pun.create({
    content: "A boiled egg is hard to beat.",
    price: 250,
    quantity: 15,
  });

  const pun59 = await Pun.create({
    content:
      "Kleptomaniacs don't understand puns. They always take things literally.",
    price: 250,
    quantity: 15,
  });

  const pun60 = await Pun.create({
    content:
      "I removed the shell from my snail to make it faster, but it just got more sluggish.",
    price: 250,
    quantity: 15,
  });

  const pun61 = await Pun.create({
    content: "Have you used a shovel? It's a ground-breaking invention!",
    price: 50,
    quantity: 5,
  });

  const pun62 = await Pun.create({
    content: "A plateau is the highest form of flattery.",
    price: 50,
    quantity: 5,
  });

  const pun63 = await Pun.create({
    content:
      "I sued the airline when they couldn't find my luggage. Sadly, I lost my case.",
    price: 50,
    quantity: 5,
  });

  const pun64 = await Pun.create({
    content:
      "I'm glad I was finally fired from my can crushing job. The work was soda pressing.",
    price: 50,
    quantity: 5,
  });

  const pun65 = await Pun.create({
    content: "How much does a pirate pay for corn? A buccaneer.",
    price: 50,
    quantity: 5,
  });

  const pun66 = await Pun.create({
    content: "A termite walks into a bar and asks, 'Where is the bar tender?'",
    price: 50,
    quantity: 5,
  });

  const pun67 = await Pun.create({
    content:
      "The librarian got annoyed when we put the books back in the wrong places. We ought to be ashamed of ourshelves.",
    price: 50,
    quantity: 5,
  });

  const pun68 = await Pun.create({
    content: "Why did the tomato blush? It saw the salad dressing.",
    price: 50,
    quantity: 5,
  });

  const pun69 = await Pun.create({
    content: "The sesame seed couldn't leave the casino. It was on a roll.",
    price: 50,
    quantity: 5,
  });

  const pun70 = await Pun.create({
    content:
      "It was a terrible summer for Humpty Dumpty. But he had a great fall.",
    price: 50,
    quantity: 5,
  });

  const pun71 = await Pun.create({
    content:
      "A bald man wanted to borrow my comb, but I know he'd never part with it.",
    price: 50,
    quantity: 5,
  });

  const pun72 = await Pun.create({
    content: "I repair elevators for a living. It has its ups and downs.",
    price: 50,
    quantity: 5,
  });

  const pun73 = await Pun.create({
    content: "I used to be a banker, but then I lost interest.",
    price: 50,
    quantity: 5,
  });

  const pun74 = await Pun.create({
    content: "You can't take out coffee from this cafe. It's grounded.",
    price: 50,
    quantity: 5,
  });

  const pun75 = await Pun.create({
    content: "It was such a beautiful wedding. Even the cake was in tiers.",
    price: 50,
    quantity: 5,
  });

  const pun76 = await Pun.create({
    content:
      "No matter how hard you push the envelope, it will still be stationary.",
    price: 725,
    quantity: 80,
  });

  const pun77 = await Pun.create({
    content: "Will glass coffins be a success? Remains to be seen.",
    price: 725,
    quantity: 80,
  });

  const pun78 = await Pun.create({
    content: "I built a robot clown. It works with the circuits.",
    price: 725,
    quantity: 80,
  });

  const pun79 = await Pun.create({
    content:
      "I try not to eat anything with food coloring. I feel like I dye a little inside.",
    price: 725,
    quantity: 80,
  });

  const pun80 = await Pun.create({
    content:
      "He tried to cope with his claustrophobia but struggled to think outside the box.",
    price: 725,
    quantity: 80,
  });

  const pun81 = await Pun.create({
    content: "A mermaid skipped math class. She forgot her algae-bra.",
    price: 725,
    quantity: 80,
  });

  const pun82 = await Pun.create({
    content: "Small babies are delivered by stork. The big ones need a crane.",
    price: 725,
    quantity: 80,
  });

  const pun83 = await Pun.create({
    content: "To the person who invented zero, thanks for nothing.",
    price: 725,
    quantity: 80,
  });

  const pun84 = await Pun.create({
    content:
      "A food critic reviewed the new space-themed restaurant. The food was good, but it had no atmosphere.",
    price: 725,
    quantity: 80,
  });

  const pun85 = await Pun.create({
    content: "Dumbo was sad. The other animals called him ear-relephant.",
    price: 725,
    quantity: 80,
  });

  const pun86 = await Pun.create({
    content:
      "I lost my mood ring the other day. I don't know how I feel about that.",
    price: 725,
    quantity: 80,
  });

  const pun87 = await Pun.create({
    content:
      "I may not know what 'apocalypse' means, but it's not like it's the end of the world.",
    price: 725,
    quantity: 80,
  });

  const pun88 = await Pun.create({
    content: "Waking up this morning was an eye opening experience.",
    price: 725,
    quantity: 80,
  });

  const pun89 = await Pun.create({
    content: "Long fairy tales have a tendency to dragon.",
    price: 725,
    quantity: 80,
  });

  const pun90 = await Pun.create({
    content:
      "I have a candy cane collection. The best ones are in mint condition.",
    price: 725,
    quantity: 80,
  });

  const pun91 = await Pun.create({
    content: "For sale: wigs for $1. Small price toupee.",
    price: 725,
    quantity: 80,
  });

  const pun92 = await Pun.create({
    content:
      "People say I'm the cheapest person they ever met, but I'm just not buying it.",
    price: 725,
    quantity: 80,
  });

  const pun93 = await Pun.create({
    content: "There's a typo on that tombstone. What a grave mistake.",
    price: 400,
    quantity: 10,
  });

  const pun94 = await Pun.create({
    content: "Geology rocks, but geography is where it's at.",
    price: 400,
    quantity: 10,
  });

  const pun95 = await Pun.create({
    content:
      "Someone has been removing wheels off of every vehicle in sight. Police are working tirelessly to catch the perp.",
    price: 400,
    quantity: 10,
  });

  const pun96 = await Pun.create({
    content: "Due to the lockdown, I'll only be telling inside jokes.",
    price: 400,
    quantity: 10,
  });

  const pun97 = await Pun.create({
    content: "My pony has a sore throat. It's a little horse.",
    price: 400,
    quantity: 10,
  });

  const pun98 = await Pun.create({
    content:
      "I used to be addicted to the hokey pokey, but then I turned myself around.",
    price: 400,
    quantity: 10,
  });

  const pun99 = await Pun.create({
    content:
      "I didn't realize Canada is real. I thought it was the land of mapleleaf.",
    price: 400,
    quantity: 10,
  });

  const pun100 = await Pun.create({
    content:
      "My hen likes to count her eggs everyday. She's a true mathemachicken.",
    price: 400,
    quantity: 10,
  });

  const pun101 = await Pun.create({
    content:
      "Yo, I forgot to answer you when you asked me for that pamphlet. Sorry, brochure.",
    price: 400,
    quantity: 10,
  });

  const pun102 = await Pun.create({
    content:
      "Back in the day, he swept many people off their feet. Then he was fired for being such an aggressive janitor.",
    price: 400,
    quantity: 10,
  });

  const pun103 = await Pun.create({
    content:
      "I rented a limo but forgot to hire a driver. All that money and nothing to chauffeur it.",
    price: 400,
    quantity: 10,
  });

  const pun104 = await Pun.create({
    content:
      "England doesn't have a kidney bank, but it does have a Liverpool.",
    price: 400,
    quantity: 10,
  });

  const pun105 = await Pun.create({
    content:
      "What is the quickest way to make antifreeze? Take away her blanket.",
    price: 400,
    quantity: 10,
  });

  const pun106 = await Pun.create({
    content:
      "I refuse to go to a nude beach. I guess I'm just too clothes-minded.",
    price: 400,
    quantity: 10,
  });

  const pun107 = await Pun.create({
    content: "Cause of death: train. It was a loco-motive.",
    price: 400,
    quantity: 10,
  });

  const pun108 = await Pun.create({
    content: "I had to quit my job as a programmer. I never did get arrays.",
    price: 400,
    quantity: 10,
  });

  const pun109 = await Pun.create({
    content: "A programmer cheered, '['hip', 'hip']'!",
    price: 940,
    quantity: 20,
  });

  const pun110 = await Pun.create({
    content: "I finally got a new sofa. It was a chairishable moment.",
    price: 940,
    quantity: 20,
  });

  const pun111 = await Pun.create({
    content:
      "The priest wasn't sure what to say at the wilted flower's funeral so he went with the classic 'dearly depotted'.",
    price: 940,
    quantity: 20,
  });

  const pun112 = await Pun.create({
    content: "The rhinoceros called the hippopotamus fat. How hippo-critical!",
    price: 940,
    quantity: 20,
  });

  const pun113 = await Pun.create({
    content: "I wish I had more time to eat. So I went back four seconds.",
    price: 940,
    quantity: 20,
  });

  const pun114 = await Pun.create({
    content: "A vegetarian thought she knew me, but I had never met herbivore.",
    price: 940,
    quantity: 20,
  });

  const pun115 = await Pun.create({
    content:
      "I wanted to throw a space-themed party, but I didn't want to planet.",
    price: 940,
    quantity: 20,
  });

  const pun116 = await Pun.create({
    content: "My bicycle can't stand up on it's own. It's two tired.",
    price: 940,
    quantity: 20,
  });

  const pun117 = await Pun.create({
    content:
      "When they told him to stop impersonating flamingos, he had to put his foot down.",
    price: 940,
    quantity: 20,
  });

  const order1 = await Order.create({
    status: "open",
    emailAddress: "brenda.wong@gmail.com",
    shippingAddressName: "Brenda Wong",
    shippingAddressStreet: "123 Sesame St.",
    shippingAddressCity: "New York City",
    shippingAddressState: "NY",
    shippingAddressZip: "10036",
  });

  const order2 = await Order.create({
    status: "fulfilled",
  });

  const order3 = await Order.create({
    status: "fulfilled",
  });

  const order4 = await Order.create({
    status: "fulfilled",
  });

  const order5 = await Order.create({
    status: "open",
  });

  await order1.addPun(pun1);
  await order2.addPuns([pun2, pun3, pun4]);
  await order3.addPuns([pun5, pun6, pun7, pun8]);
  await order4.addPuns([pun28, pun93]);
  await order5.addPuns([pun102, pun72, pun47]);
  await user1.addOrder(order1);
  await user2.addOrder(order2);
  await user2.addOrder(order3);
  await user2.addOrder(order4);
  await user2.addOrder(order5);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
