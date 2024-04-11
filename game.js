let player = {
  name: "",
  health: 100,
  inventory: [],
  equipped: [],
  foundItems: [], // Array to keep track of found items
};

function startGame() {
  player.name = prompt("Welcome! What is your name?");
  if (player.name === "") {
    player.name = "Player";
  }
  alert(`Hello, ${player.name}! Let's begin your adventure.`);
  randomEvents();
}

function randomEvents() {
  var number = Math.floor(Math.random() * 3) + 1;
  if (number === 1) {
    fightGoblin();
  } else if (number === 2) {
    findLoot();
  } else if (number === 3) {
    foundDoor();
  }
}

function fightGoblin() {
  alert("You encountered a goblin!");

  // Assuming goblin deals random damage between 10 to 20
  let goblinDamage = Math.floor(Math.random() * (15 - 10 + 1)) + 10;

  // Player fights back
  let playerDamage = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

  // Goblin's health
  let goblinHealth = 50;

  while (player.health > 0 && goblinHealth > 0) {
    // Player's turn
    goblinHealth -= playerDamage;
    if (goblinHealth <= 0) {
      alert("You defeated the goblin!");

      // Restore player's health after defeating goblin
      player.health += 20; // Adjust this value as needed

      // Ensure player's health doesn't exceed 100
      player.health = Math.min(player.health, 100);

      // Determine if the goblin drops a key
      let dropChance = Math.random();
      if (dropChance <= 0.1 && !player.foundItems.includes("key")) {
        player.inventory.push("key");
        player.foundItems.push("key"); // Add key to found items
        alert("You found a key!");
      } else if (dropChance <= 0.25 && !player.foundItems.includes("boots")) {
        player.inventory.push("boots");
        player.foundItems.push("boots"); // Add boots to found items
        alert("You found boots! (decrease damage taken)");
      } else if (dropChance <= 0.45 && !player.foundItems.includes("pants")) {
        player.inventory.push("pants");
        player.foundItems.push("pants"); // Add pants to found items
        alert("You found pants! (decrease damage taken)");
      } else if (
        dropChance <= 0.55 &&
        !player.foundItems.includes("chestplate")
      ) {
        player.inventory.push("chestplate");
        player.foundItems.push("chestplate"); // Add chestplate to found items
        alert("You found a chestplate! (decrease damage taken)");
      }
      break;
    }

    // Goblin's turn
    player.health -= goblinDamage;
    if (player.health <= 0) {
      alert("YOU DIED");
      endGame();
      break;
    }
  }
  if (player.health > 0) {
    randomEvents();
  }
}

function findLoot() {
  alert("You found a treasure!");

  let lootChance = Math.random();
  if (lootChance <= 0.1 && !player.foundItems.includes("sword")) {
    player.inventory.push("sword");
    player.equipped.push({ name: "sword", damage: 20 });
    player.foundItems.push("sword"); // Add sword to found items
    alert("You found a sword and equipped it (increased damage dealt)");
  } else if (lootChance <= 0.11 && !player.foundItems.includes("crown")) {
    player.inventory.push("crown");
    player.foundItems.push("crown"); // Add crown to found items
    alert("You found the CROWN!");
  } else if (lootChance <= 0.16 && !player.foundItems.includes("shield")) {
    player.inventory.push("shield");
    player.equipped.push({ name: "shield", damage: -10 });
    player.foundItems.push("shield"); // Add shield to found items
    alert("You found a shield and equipped it (decreased damage taken)");
  } else {
    alert("EMPTY");
  }
  randomEvents();
}

function foundDoor() {
  let hasKey = player.inventory.includes("key");

  if (hasKey) {
    let decision = confirm("You found a door! Do you want to go inside?");
    if (decision) {
      alert("You used the found key!");
      fightDragon();
    } else {
      randomEvents();
    }
  } else {
    randomEvents();
  }
}

function fightDragon() {
  alert("You encountered a dragon!");

  // Assuming dragon deals random damage between 30 to 50
  let dragonDamage = Math.floor(Math.random() * (50 - 30 + 1)) + 30;

  // Dragon's health
  let dragonHealth = 200;

  while (player.health > 0 && dragonHealth > 0) {
    // Player's turn
    dragonHealth -= player.equipped.reduce((totalDamage, item) => {
      return totalDamage + (item.damage || 0);
    }, 0);

    if (dragonHealth <= 0) {
      alert("You defeated the dragon!");
      endGame();
      break;
    }

    // Dragon's turn
    player.health -= dragonDamage;
    if (player.health <= 0) {
      alert("YOU DIED");
      endGame();
      break;
    }
  }
}

function endGame() {
  alert("Game Over");
  let decision = confirm("Wanna try again?");
  if (decision) {
    startGame();
  }
}

startGame();
