// EnshroudedGuides.com SEO Page Generator
// Generates programmatic SEO landing pages for all 3 tools
// Run: node scripts/generate-pages.js
// Output: static HTML pages committed to git — no runtime dependency

const fs = require('fs');
const path = require('path');

const ROOT = '/Users/judy/70-Projects/wangzhan/enshrouded-guide';
const TODAY = '2026-07-18';

// === BUILD ADVISOR SEO PAGES (Phase 3) ===
const BUILD_PAGES = [
  { slug: 'mage', title: 'Best Mage Build Enshrouded 2026', h1: 'Best Mage Build in Enshrouded — Battlemage & DPS Guide',
    desc: 'Best mage build for Enshrouded 2026. Battlemage guide with Wand+Staff DPS skills, best weapons, and boss strategies for magic users.',
    keywords: 'Enshrouded best mage build, Enshrouded mage DPS, Enshrouded Battlemage build, Enshrouded wand build, Enshrouded magic build',
    playstyle: 'mage', icon: '🔮', role: 'Ranged AoE Magic DPS',
    intro: 'The Mage (Battlemage) build is the strongest AoE damage dealer in Enshrouded. With Wand multi-shot, Chain Hit, and Mass Destruction, you can clear entire rooms of enemies before they reach you. Combined with Blink for repositioning and Water Aura for sustain, this build excels in group play and against most bosses.',
    qa: [
      { q: 'What is the best mage build in Enshrouded?', a: 'The Battlemage (Wand+Shield) with Water Aura for passive healing. It\'s the safest solo build, requires no ammo, and works against every boss in the game. Prioritize Arcane Empowerment, Pyromancy, and Overcharge.' },
      { q: 'What weapon should a mage use in Enshrouded?', a: 'Scorching Wand (A-Tier) as your main weapon for sustained DPS. Shroud Staff as secondary for crowd control and burst. Endgame, upgrade to the legendary variants from Fell Dragon and Hollow King.' },
      { q: 'Is mage good for solo play in Enshrouded?', a: 'Yes — the Battlemage variant with Water Aura, Blink, and Ward (shield block) is highly survivable. However, pure glass-cannon mage builds are better suited for co-op where a tank can hold aggro.' }
    ] },
  { slug: 'melee', title: 'Best Melee Build Enshrouded 2026', h1: 'Best Melee Build in Enshrouded — Barbarian Tank Guide',
    desc: 'Best melee build for Enshrouded 2026. Barbarian Tank guide with 2H Greatsword skills, Wailing Blade, best armor sets, and boss strategies.',
    keywords: 'Enshrouded best melee build, Enshrouded tank build, Enshrouded Barbarian build, Enshrouded 2H sword build, Enshrouded melee DPS',
    playstyle: 'melee', icon: '⚔️', role: 'Frontline Tank — 2H Greatsword Berserker',
    intro: 'The Melee Tank (Barbarian) build is the most durable character in Enshrouded. With Iron Skin, Bulwark, Juggernaut, and Last Stand, you can face-tank bosses that would one-shot other builds. The Wailing Blade 2H Greatsword cleaves 3 targets per swing — devastating for both boss fights and crowd control.',
    qa: [
      { q: 'What is the best melee build in Enshrouded?', a: 'The Barbarian Tank with 2H Greatsword (Wailing Blade). It combines the Tank tree\'s damage reduction (Iron Skin, Bulwark, Juggernaut) with Survivor sustain (Water Aura, Battle Heal) for an unkillable frontline fighter.' },
      { q: 'Sword and shield or 2H greatsword — which is better?', a: '2H Greatsword (Wailing Blade) wins for raw damage output and cleave. Sword+Shield (Noble Sword + Guardian Shield) is better for parry-heavy playstyles and survivability. Both are viable — the Build Advisor can help you choose.' },
      { q: 'What armor should a melee tank use?', a: 'Start with Rising Fighter Set, upgrade to Guard of the North at mid-game, then Radiant Paladin (scales 13-25) or Sunpiercer (fixed Lv.25, highest physical resist in the game).' }
    ] },
  { slug: 'ranged', title: 'Best Ranged Build Enshrouded 2026', h1: 'Best Ranged Build in Enshrouded — Archer Assassin Guide',
    desc: 'Best ranged build for Enshrouded 2026. Archer Assassin guide with Bow+Dagger skills, Ignited Bow, Dragonbone Bow farm, and boss strategies.',
    keywords: 'Enshrouded best ranged build, Enshrouded archer build, Enshrouded assassin build, Enshrouded bow build, Enshrouded dagger build',
    playstyle: 'ranged', icon: '🏹', role: 'Precision DPS — Bow/Dagger Stealth Specialist',
    intro: 'The Archer Assassin build delivers the highest single-target burst damage in Enshrouded. Opening from stealth with Ambush, chaining Dagger combos with Slice and Dice, then finishing with Fatal Precision — this build melts bosses. The Ignited Bow provides safe, consistent fire damage at range for flying enemies.',
    qa: [
      { q: 'What is the best ranged build in Enshrouded?', a: 'The Archer Assassin with Ignited Bow + Hunter\'s Crossbow. It combines Assassin stealth bonuses (Ambush, Shadow Step) with the best ranged weapons for both burst and sustained DPS.' },
      { q: 'Bow or Crossbow — which is better?', a: 'Bow (Ignited Bow) for sustained DPS and elemental damage. Crossbow (Hunter\'s Crossbow) for burst and stagger. The best builds use both — Bow for kiting and general use, Crossbow for opening shots and boss staggers.' },
      { q: 'How do I farm the Dragonbone Bow?', a: 'Defeat Fell Dragon in Kindlewastes (~20% drop rate). The boss respawns after a few in-game days. Requires max Flame Altar and fire resist gear. Full guide at /legendary-weapons.html.' }
    ] },
  { slug: 'tank', title: 'Best Tank Build Enshrouded 2026', h1: 'Best Tank Build in Enshrouded — Full Tank Survivability Guide',
    desc: 'Best tank build for Enshrouded 2026. Full survivability guide with skill allocation, Guardian Shield, heavy armor sets, and how to face-tank every boss.',
    keywords: 'Enshrouded best tank build, Enshrouded tank build, Enshrouded survivability build, Enshrouded shield build, Enshrouded heavy armor build',
    playstyle: 'melee', icon: '🛡️', role: 'Immortal Tank — Sword+Shield Survivability Specialist',
    intro: 'The pure Tank build prioritizes survivability above all else. By stacking Tank tree nodes (Iron Skin, Bulwark, Juggernaut, Last Stand, Retaliation) with Healer sustain (Water Aura, Battle Heal, Endurance), you become nearly unkillable. The Guardian Shield provides the best parry window in the game.',
    qa: [
      { q: 'Can you play a pure tank in Enshrouded?', a: 'Yes — the Tank tree provides massive damage reduction through Iron Skin, Bulwark, Juggernaut, and Last Stand. Combined with the Guardian Shield\'s parry window and Water Aura healing, you can survive encounters that would kill other builds.' },
      { q: 'What\'s the difference between Tank and Barbarian?', a: 'Tank uses Sword+Shield for maximum parry and block. Barbarian uses 2H Greatsword for cleave damage while still being tanky. Tank is safer; Barbarian kills faster. Both share the Tank and Survivor trees.' }
    ] },
  { slug: 'solo', title: 'Best Solo Build Enshrouded 2026', h1: 'Best Solo Build in Enshrouded — Complete Solo Play Guide',
    desc: 'Best solo build for Enshrouded 2026. Self-sufficient builds compared — Battlemage, Melee Tank, and Starter Build with skill allocations and boss strategies.',
    keywords: 'Enshrouded best solo build, Enshrouded solo guide, Enshrouded solo play, Enshrouded self-sufficient build, Enshrouded solo boss',
    playstyle: 'hybrid', icon: '🧑', role: 'Self-Sufficient Solo Survivor',
    intro: 'Solo play in Enshrouded demands self-sufficiency — you need damage, sustain, and mobility all in one build. The top three solo builds are Battlemage (Wand+Shield, safest), Melee Tank (2H Greatsword, highest durability), and Starter Build (Sword+Shield, most flexible). All three include Water Aura for passive healing.',
    qa: [
      { q: 'What is the absolute best solo build in Enshrouded?', a: 'Battlemage (Wand+Shield) with Water Aura is widely considered the best solo build. It\'s safe (ranged attacks + shield block), requires no ammo crafting, self-heals passively, and performs well against every boss in the game.' },
      { q: 'Can I solo every boss in Enshrouded?', a: 'Yes — every boss can be soloed with the right build and preparation. Fell Dragon is the hardest solo fight (requires fire resist gear and 10+ Greater Healing Potions). The Build Advisor can recommend the best solo build for your playstyle.' }
    ] },
  { slug: 'co-op', title: 'Best Co-op Build Enshrouded 2026', h1: 'Best Co-op Builds in Enshrouded — Team Composition Guide',
    desc: 'Best co-op builds for Enshrouded 2026. Team compositions for 2-4 players — tank, DPS, healer roles with synergistic skill allocations.',
    keywords: 'Enshrouded co-op build, Enshrouded multiplayer build, Enshrouded team build, Enshrouded group build, Enshrouded support build',
    playstyle: 'mage', icon: '👥', role: 'Team-Optimized Roles',
    intro: 'Co-op play unlocks the full potential of Enshrouded\'s build system. With 2-4 players, you can run dedicated roles: a Melee Tank to hold aggro, a Mage DPS for AoE clearing, an Archer Assassin for boss burst, and a Healer for team sustain. Specialization makes every role stronger than a generalist solo build.',
    qa: [
      { q: 'What\'s the best 2-player team composition?', a: 'Melee Tank (aggro + cleave) + Mage DPS (AoE + ranged damage). The tank holds enemy attention while the mage clears from safety. Both take Water Aura for overlapping passive healing.' },
      { q: 'Is there a dedicated healer build in Enshrouded?', a: 'The Healer tree provides powerful team sustain — Water Aura (AoE HoT), Battle Heal (burst), and group buffs. While there\'s no pure "heal-only" class, a Healer + Tank hybrid is extremely effective in 3-4 player groups.' }
    ] },
  { slug: 'boss-killer', title: 'Best Boss Killer Build Enshrouded 2026', h1: 'Best Boss Killer Build in Enshrouded — Solo Every Boss',
    desc: 'Best boss killer build for Enshrouded 2026. Optimized for soloing Fell Warden, Wyvern, Matron, Scavenger Warlord, Fell Dragon, and Hollow King.',
    keywords: 'Enshrouded boss killer build, Enshrouded boss solo build, Enshrouded boss DPS, Enshrouded Fell Dragon build, Enshrouded Hollow King build',
    playstyle: 'ranged', icon: '💀', role: 'Boss-Optimized DPS Specialist',
    intro: 'Boss killing requires a specific optimization: high single-target damage, survivability for long fights, and answers for each boss\'s unique mechanics. The Archer Assassin excels here — stealth openers for burst, Bow for kiting flying bosses, and Fatal Precision to finish. The Melee Tank is the safer choice if you prefer face-tanking over dodging.',
    qa: [
      { q: 'What build kills bosses the fastest?', a: 'Archer Assassin has the highest single-target burst — Ambush opener into Dagger combo deals massive damage before the boss can react. For sustained boss DPS, Mage (Battlemage) with Wand multi-shot + Chain Hit is more consistent.' },
      { q: 'What\'s the hardest boss to solo?', a: 'Fell Dragon (Kindlewastes) is the hardest solo boss — multi-phase fight requiring fire resist gear, 10+ Greater Healing Potions, and max food buffs. Hollow King is the second hardest due to shadow clone mechanics.' }
    ] },
  { slug: 'beginner', title: 'Best Beginner Build Enshrouded 2026', h1: 'Best Beginner Build in Enshrouded — New Player Starter Guide',
    desc: 'Best beginner build for Enshrouded 2026. Easy starter build with first 20 skill points, Double Jump, Water Aura, and safe leveling through Springlands.',
    keywords: 'Enshrouded beginner build, Enshrouded starter build, Enshrouded new player build, Enshrouded first build, Enshrouded easy build',
    playstyle: 'hybrid', icon: '🌱', role: 'Beginner-Friendly All-Rounder',
    intro: 'The Starter Build is purpose-built for new players. It prioritizes mobility (Double Jump, Updraft), survivability (Water Aura, Battle Heal), and versatility (Sword+Shield, Bow pulling). You won\'t need to respec until Level 10+ — by then, you\'ll know what playstyle you enjoy and can transition to a specialized build.',
    qa: [
      { q: 'What build should a complete beginner use?', a: 'The Starter Build with Sword+Shield. First 5 skill points: Double Jump → Dessert Stomach → Battle Heal → Runner → Sneak Attack. This gives you mobility, sustain, and enough damage for all early-game content.' },
      { q: 'When should I switch from the Starter Build?', a: 'Around Level 10-12, after you\'ve defeated Fell Warden and entered Revelwoods. By then, you\'ll know if you prefer melee, magic, or ranged combat. Respec at any Flame Altar using Runes.' }
    ] },
  { slug: 'early-game', title: 'Best Early Game Build Enshrouded', h1: 'Best Early Game Build in Enshrouded — Levels 1-10',
    desc: 'Best early game build for Enshrouded levels 1-10. Skill point allocation, best early weapons, Copper/Iron gear, and Springlands progression guide.',
    keywords: 'Enshrouded early game build, Enshrouded leveling build, Enshrouded low level build, Enshrouded Springlands build, Enshrouded starting skills',
    playstyle: 'hybrid', icon: '🌱', role: 'Early Game Optimized (Lv.1-10)',
    intro: 'The early game (Levels 1-10) is about survival and mobility. Your first 10 skill points are the most important decisions you\'ll make — prioritize Double Jump (Survivor), Water Aura (Healer), and Blink (Healer) before investing in any damage skills. The Springlands biome is forgiving, but the Shroud timer is short — Flame Altar upgrades are critical.',
    qa: [
      { q: 'What are the most important early game skills?', a: 'Double Jump (#1 priority), Water Aura (#2, passive healing), Dessert Stomach (#3, 4th food buff slot), Battle Heal (#4, emergency healing), Blink (#5, teleport dodge). Damage skills come later.' },
      { q: 'What weapon should I use in early game?', a: 'Craft a Copper Sword as soon as you rescue the Blacksmith. Upgrade to Noble Sword (Iron tier) by Level 8. Always carry a bow for pulling enemies — even a basic Wooden Bow works.' }
    ] },
  { slug: 'mid-game', title: 'Best Mid Game Build Enshrouded', h1: 'Best Mid Game Build in Enshrouded — Levels 10-20',
    desc: 'Best mid game build for Enshrouded levels 10-20. Iron tier weapons and armor, Revelwoods progression, Fell Warden and Wyvern boss strategies.',
    keywords: 'Enshrouded mid game build, Enshrouded level 10 build, Enshrouded Iron tier build, Enshrouded Revelwoods build, Enshrouded mid game guide',
    playstyle: 'melee', icon: '🌿', role: 'Mid Game Power Spike (Lv.10-20)',
    intro: 'Mid game (Levels 10-20) is where your build comes online. By now you have 15-20 skill points and access to Iron-tier crafting. This is when you should commit to a specialization — Melee Tank, Mage DPS, or Archer Assassin. The Revelwoods biome introduces Iron nodes, hardwood, and the Wyvern boss.',
    qa: [
      { q: 'When should I specialize my build?', a: 'Level 10-12 is the ideal time to commit to a build direction. By then you have your core mobility/sustain skills and can invest your next 10 points into your chosen tree (Tank, Mage, or Assassin).' },
      { q: 'What gear should I have by Level 15?', a: 'Full Iron-tier weapons (Noble Sword, Fell Axe, or Scorching Wand) and at least Guard of the North or Adventurer armor. Flame Altar Level 3 minimum. All 5 core NPCs rescued.' }
    ] },
  { slug: 'late-game', title: 'Best Late Game Build Enshrouded', h1: 'Best Late Game Build in Enshrouded — Levels 20-30',
    desc: 'Best late game build for Enshrouded levels 20-30. Steel tier weapons and armor, Nomad Highlands and Kindlewastes progression, boss strategies.',
    keywords: 'Enshrouded late game build, Enshrouded level 20 build, Enshrouded Steel tier build, Enshrouded Kindlewastes build, Enshrouded endgame prep',
    playstyle: 'mage', icon: '🏔️', role: 'Late Game Dominance (Lv.20-30)',
    intro: 'Late game (Levels 20-30) is where Enshrouded gets serious. Steel-tier weapons (Wailing Blade, Ignited Bow, Guardian Shield) become available, and you\'ll face your toughest challenges yet — the Matron, Scavenger Warlord, and the harsh Kindlewastes desert. By Level 25, your build should be fully online with 20+ allocated skill points.',
    qa: [
      { q: 'What\'s the best late game weapon?', a: 'Wailing Blade (2H Greatsword) for melee, Ignited Bow for ranged, Scorching Wand for mage. All three require Steel Bars and Flame Altar Level 4+. The legendary versions drop from endgame bosses.' },
      { q: 'How do I prepare for the Kindlewastes?', a: 'Flame Altar Level 4 minimum, full Steel-tier gear, 5+ Greater Healing Potions, and a temporary Flame Altar placed at the biome border. The desert has scarce water — bring extra.' }
    ] },
  { slug: 'end-game', title: 'Best Endgame Build Enshrouded 2026', h1: 'Best Endgame Build in Enshrouded — Level 30+ Legendary Guide',
    desc: 'Best endgame build for Enshrouded level 30+. Legendary weapons, endgame armor sets, Fell Dragon and Hollow King strategies, max-level optimization.',
    keywords: 'Enshrouded endgame build, Enshrouded level 30 build, Enshrouded legendary build, Enshrouded max level build, Enshrouded best endgame gear',
    playstyle: 'ranged', icon: '👑', role: 'Endgame Perfected (Lv.30+)',
    intro: 'Endgame (Level 30+) is about optimization. Your build has all 20+ skill points allocated, and the goal shifts to acquiring legendary weapons and perfecting your loadout. Fell Dragon and Hollow King are your primary targets — both drop legendary materials and weapons. Optimize gems, food buffs, and complete remaining Shroud Roots for every last skill point.',
    qa: [
      { q: 'What\'s the best endgame weapon in Enshrouded?', a: 'Legendary Wailing Blade for melee (~15% drop from Fell Dragon), Dragonbone Bow for ranged (~20% drop), and Hollow King\'s Scepter for mage (~10% drop). All are best-in-slot for their respective builds.' },
      { q: 'What should I do after hitting Level 30?', a: 'Farm legendary weapons from Fell Dragon and Hollow King, optimize gems (Currents for mage, Cutting for melee, Corruption for assassin), complete all Shroud Roots for max skill points, and build your dream base.' }
    ] }
];

// === GOAL PLANNER SEO PAGES (Phase 5) ===
// Read goals from data file
const goalsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/goals.json'), 'utf8'));
const GOAL_PAGES = goalsData.goals.map(g => ({
  slug: g.seo_slug || g.id,
  goal: g
}));

// === ADVENTURE PLANNER SEO PAGES (Phase 7) ===
const PROGRESSION_PAGES = [
  { slug: 'beginner', title: 'Enshrouded Beginner Progression Path', h1: 'Enshrouded Beginner Progression Path — What to Do First',
    desc: 'Enshrouded beginner progression path for new players. Step-by-step from Cinder Vault through Springlands — what to do and in what order.',
    keywords: 'Enshrouded beginner progression, Enshrouded what to do first, Enshrouded starting guide, Enshrouded new player path, Enshrouded early progression',
    stage: 'early', icon: '🌱', persona: 'New Player',
    intro: 'Starting Enshrouded can be overwhelming. This progression path guides you from exiting Cinder Vault through establishing your first base, rescuing the Blacksmith, crafting the Glider and Grappling Hook, and preparing for the Fell Warden — all in the optimal order.',
    qa: [
      { q: 'What should I do first in Enshrouded?', a: 'Exit Cinder Vault → Place your first Flame Altar → Craft basic tools → Build a shelter → Rescue the Blacksmith → Craft the Glider. These 6 steps set the foundation for everything else.' },
      { q: 'How long does early game take?', a: 'Expect 3-5 hours to complete the Springlands content as a new player. Speedrunners can reach Revelwoods in under 2 hours. Take your time — the Glider and Grappling Hook transform exploration.' }
    ] },
  { slug: 'solo', title: 'Enshrouded Solo Progression Path', h1: 'Enshrouded Solo Progression Path — Complete Solo Play Guide',
    desc: 'Enshrouded solo progression path. How to progress through every biome alone — optimal order, solo boss strategies, and self-sufficient build tips.',
    keywords: 'Enshrouded solo progression, Enshrouded solo path, Enshrouded solo walkthrough, Enshrouded solo guide, Enshrouded alone progression',
    stage: 'mid', icon: '🧑', persona: 'Solo Player',
    intro: 'Playing Enshrouded solo means you can\'t rely on teammates for revives, aggro splitting, or role specialization. This progression path optimizes for self-sufficiency — prioritizing sustain skills, safe boss strategies, and strategic Flame Altar placement for respawn points.',
    qa: [
      { q: 'Can you complete all of Enshrouded solo?', a: 'Yes — every biome, boss, and quest can be completed solo. Bosses scale with player count, so solo bosses have less HP. The key is preparation: always place a temporary Flame Altar near boss arenas, bring 50+ arrows, and cook max food buffs.' },
      { q: 'What\'s different about solo progression vs co-op?', a: 'Solo players need to invest more in sustain (Water Aura, Battle Heal) and carry both melee and ranged weapons. Co-op groups can specialize — a dedicated tank makes boss fights significantly easier.' }
    ] },
  { slug: 'mage', title: 'Enshrouded Mage Progression Path', h1: 'Enshrouded Mage Progression Path — Leveling as a Magic User',
    desc: 'Enshrouded mage progression path. How to level as a magic user — Wand and Staff progression, INT scaling, best mage gear at each stage.',
    keywords: 'Enshrouded mage progression, Enshrouded magic leveling, Enshrouded wand progression, Enshrouded mage leveling guide, Enshrouded INT build path',
    stage: 'mid', icon: '🔮', persona: 'Mage Player',
    intro: 'Leveling as a mage in Enshrouded requires a different progression path than melee or ranged. Magic damage scales with INT, and early-game wands are scarce. Most mages start with a physical weapon and transition to magic around Level 8-10 when the Scorching Wand becomes available.',
    qa: [
      { q: 'When should I switch to magic damage?', a: 'Start with physical weapons (Sword or Bow) for the first 8-10 levels. Transition to magic once you rescue the Alchemist, upgrade Flame Altar to Level 3, and can craft or find a Scorching Wand. Early wands have low damage and aren\'t worth using.' },
      { q: 'What\'s the best staff for leveling?', a: 'Shroud Staff is the best leveling staff — good AoE crowd control. Craft it as soon as you reach Iron tier (requires Alchemist + Flame Altar Level 3). Before that, rely on Wand multi-shot for damage.' }
    ] },
  { slug: 'after-first-boss', title: 'Enshrouded Progression After Fell Warden', h1: 'Enshrouded Progression After Fell Warden — What to Do Next',
    desc: 'Just beat Fell Warden? Here\'s what to do next in Enshrouded. Mid-game path — Revelwoods, Wyvern, Iron tier crafting, and build specialization.',
    keywords: 'Enshrouded after Fell Warden, Enshrouded what after first boss, Enshrouded mid game start, Enshrouded next boss, Enshrouded progression Fell Warden',
    stage: 'mid', icon: '💀', persona: 'Post-Warden Player',
    intro: 'Defeating the Fell Warden is the gateway to mid-game Enshrouded. With the Warden down, you can now focus on Revelwoods exploration, Iron-tier crafting, rescuing the remaining core NPCs, and preparing for the Wyvern. This is also when you should commit to a specialized build.',
    qa: [
      { q: 'What should I do right after beating Fell Warden?', a: 'Immediately: 1) Upgrade to Iron weapons at the Blacksmith, 2) Rescue any remaining core NPCs (Carpenter, Farmer, Hunter), 3) Upgrade Flame Altar to Level 3, 4) Enter Revelwoods and establish a forward base.' },
      { q: 'What level should I be for Revelwoods?', a: 'Level 8-10 minimum. The enemies hit harder than Springlands, and you\'ll need Iron weapons to clear efficiently. Place a temporary Flame Altar at the biome border for easy respawn.' }
    ] },
  { slug: 'endgame', title: 'Enshrouded Endgame Progression Path', h1: 'Enshrouded Endgame Progression Path — Level 25 to Max',
    desc: 'Enshrouded endgame progression path. Kindlewastes to Albaneve Summits, Fell Dragon and Hollow King kill order, legendary farming route, and max-level tips.',
    keywords: 'Enshrouded endgame progression, Enshrouded max level path, Enshrouded legendary farm, Enshrouded Fell Dragon preparation, Enshrouded final boss order',
    stage: 'endgame', icon: '👑', persona: 'Endgame Player',
    intro: 'The endgame (Level 25-30+) is where Enshrouded truly shines. You\'ll tackle the Kindlewastes desert, defeat the Fell Dragon and Hollow King, farm legendary weapons, and perfect your build. This progression path ensures you\'re optimally prepared for each challenge.',
    qa: [
      { q: 'What order should I do endgame content?', a: '1) Max Flame Altar (Level 5), 2) Clear Kindlewastes and farm Steel-tier gear, 3) Defeat Scavenger Warlord, 4) Farm Albaneve Summits gold chests for scaling armor, 5) Defeat Hollow King, 6) Defeat Fell Dragon (hardest).' },
      { q: 'How do I prepare for the Fell Dragon?', a: 'Full fire resist gear, 10+ Greater Healing Potions, max food buffs (4 with Dessert Stomach), Steel or Legendary weapons, and a temporary Flame Altar placed at Dragon\'s Peak (-1400, 1600). This is the hardest fight in the game — don\'t go in underprepared.' }
    ] }
];

// ===== SHARED TEMPLATE HELPERS =====

function head(title, desc, keywords, canonical, ogImage, extraSchemas) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="ai-summary" content="${desc}">
<meta name="keywords" content="${keywords}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://enshroudedguides.com${canonical}">
<meta property="og:title" content="${title} | Enshrouded Guides">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://enshroudedguides.com${canonical}">
<meta property="og:site_name" content="Enshrouded Guides">
<meta property="og:image" content="https://enshroudedguides.com${ogImage || '/og-default.jpg'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://enshroudedguides.com${ogImage || '/og-default.jpg'}">
<link rel="icon" type="image/svg+xml" href="${depthPrefix(canonical)}favicon.svg">
<link rel="stylesheet" href="${depthPrefix(canonical)}shared.css">
${schemas(title, desc, canonical, extraSchemas)}
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RF129K9BPH"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-RF129K9BPH');</script>
<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xk7tafc9j9");</script>
</head>
<body>
<div class="top-bar">Enshrouded Guides — Updated <time datetime="${TODAY}">July 18, 2026</time>.</div>
${nav(canonical)}
<main class="container">
${breadcrumb(canonical)}`;
}

function depthPrefix(canonical) {
  const parts = canonical.split('/').filter(Boolean);
  // Directory paths (ending with /) need one more level
  const depth = canonical.endsWith('/') ? parts.length : parts.length - 1;
  return depth <= 0 ? '' : '../'.repeat(depth);
}

function nav(canonical) {
  const p = depthPrefix(canonical);
  return `<nav aria-label="Main navigation">
  <div class="nav-inner">
    <a href="${p}index.html" class="logo">Enshrouded<span>Guides</span></a>
    <div class="nav-right">
      <ul class="nav-links">
        <li class="nav-dropdown">
          <button class="nav-dropdown-trigger" type="button">🗺️ Guides</button>
          <ul class="nav-dropdown-menu">
            <li><a href="${p}beginner-guide.html">Beginner Walkthrough</a></li>
            <li><a href="${p}boss-guide.html">Boss Solo Strategies</a></li>
            <li><a href="${p}base-building.html">Base Building Guide</a></li>
            <li><a href="${p}water-guide.html">Water &amp; Farming</a></li>
            <li><a href="${p}npc-guide.html">NPC Unlock Guide</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <button class="nav-dropdown-trigger" type="button">⚔️ Builds &amp; Loadouts</button>
          <ul class="nav-dropdown-menu">
            <li><a href="${p}builds/starter-build.html">Starter Build</a></li>
            <li><a href="${p}builds/melee-tank.html">Melee Tank</a></li>
            <li><a href="${p}builds/mage-dps.html">Mage DPS</a></li>
            <li><a href="${p}builds/archer-assassin.html">Archer Assassin</a></li>
            <li><a href="${p}best-skills.html">Best Skills Tier List</a></li>
            <li><a href="${p}best-weapons.html">Best Weapons Tier List</a></li>
            <li><a href="${p}armor-guide.html">Armor Sets &amp; Stats</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <button class="nav-dropdown-trigger" type="button">📊 Reference</button>
          <ul class="nav-dropdown-menu">
            <li><a href="${p}map.html">Map &amp; Locations</a></li>
            <li><a href="${p}legendary-weapons.html">Legendary Weapon Farm</a></li>
            <li><a href="${p}server-guide.html">Server Setup</a></li>
            <li><a href="${p}fix-performance.html">Fix &amp; Performance</a></li>
            <li><a href="${p}index.html#faq">Quick Answers</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <button class="nav-dropdown-trigger" type="button">🛠️ Tools</button>
          <ul class="nav-dropdown-menu">
            <li><a href="${p}tools/build-advisor/">🧠 Build Advisor</a></li>
            <li><a href="${p}tools/goal-planner/">🎯 Goal Planner</a></li>
            <li><a href="${p}tools/adventure-planner/">🗺️ Adventure Planner</a></li>
          </ul>
        </li>
      </ul>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode"><span class="sun">☀️</span><span class="moon">🌙</span></button>
    </div>
  </div>
</nav>`;
}

function breadcrumb(canonical) {
  const parts = canonical.split('/').filter(Boolean);
  const p = depthPrefix(canonical);
  let html = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${p}index.html">Home</a>`;
  let cumulative = '';
  for (let i = 0; i < parts.length - 1; i++) {
    cumulative += '/' + parts[i];
    const label = parts[i].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    html += ` / <a href="${p}${cumulative.substring(1)}/">${label}</a>`;
  }
  const lastLabel = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  html += ` / ${lastLabel}</nav>`;
  return html;
}

function schemas(title, desc, canonical, extra) {
  const url = `https://enshroudedguides.com${canonical}`;
  const parts = canonical.split('/').filter(Boolean);
  let breadcrumbItems = `{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://enshroudedguides.com/" }`;
  let cum = '';
  for (let i = 0; i < parts.length; i++) {
    cum += '/' + parts[i];
    const label = parts[i].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    breadcrumbItems += `,\n    { "@type": "ListItem", "position": ${i + 2}, "name": "${label}", "item": "https://enshroudedguides.com${cum}/" }`;
  }

  let extraSchema = '';
  if (extra && extra.faq) {
    extraSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${extra.faq.map((qa, i) => `    {
      "@type": "Question",
      "name": "${qa.q.replace(/"/g, '\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${qa.a.replace(/"/g, '\\"')}"
      }
    }${i < extra.faq.length - 1 ? ',' : ''}`).join('\n')}
  ]
}
</script>`;
  }

  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "${extra && extra.pageType || 'WebPage'}",
  "headline": "${title}",
  "url": "${url}",
  "description": "${desc}",
  "publisher": { "@type": "Organization", "name": "Enshrouded Guides" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [ ${breadcrumbItems} ]
}
</script>${extraSchema}`;
}

function footer(canonical) {
  const p = depthPrefix(canonical);
  return `</main>
<footer>
  <p style="margin-bottom:12px">
    <a href="${p}beginner-guide.html">Beginner Guide</a> &nbsp;|&nbsp;
    <a href="${p}best-skills.html">Best Skills</a> &nbsp;|&nbsp;
    <a href="${p}best-weapons.html">Best Weapons</a> &nbsp;|&nbsp;
    <a href="${p}base-building.html">Base Building</a> &nbsp;|&nbsp;
    <a href="${p}boss-guide.html">Boss Guide</a>
  </p>
  <p>Enshrouded Guides — The independent Enshrouded resource. Not affiliated with Keen Games.</p>
  <p style="margin-top:8px">Enshrouded and all related content are trademarks of Keen Games GmbH.</p>
  <p style="margin-top:8px">
    <a href="${p}about.html">About</a> &nbsp;|&nbsp;
    <a href="${p}privacy.html">Privacy Policy</a> &nbsp;|&nbsp;
    <a href="${p}terms.html">Terms of Use</a> &nbsp;|&nbsp;
    <a href="${p}contact.html">Contact</a> &nbsp;|&nbsp;
    <a href="${p}sitemap.xml">Sitemap</a>
  </p>
</footer>
<button class="back-top" id="backTop" aria-label="Back to top">↑</button>
<script src="${p}cookie-consent.js"></script>
<script>
(function(){var t=document.getElementById('themeToggle'),s=localStorage.getItem('enshrouded-theme');if(s)document.documentElement.setAttribute('data-theme',s);t.addEventListener('click',function(){var c=document.documentElement.getAttribute('data-theme'),n=(c==='dark')?'light':'dark';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('enshrouded-theme',n);});var b=document.getElementById('backTop');window.addEventListener('scroll',function(){b.classList.toggle('visible',window.scrollY>500);});b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});})();
</script>
</body>
</html>`;
}

// ===== PAGE GENERATORS =====

function generateBuildPage(page) {
  const canonical = `/builds/recommended/${page.slug}/`;
  const p = depthPrefix(canonical);

  const builds = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/builds.json'), 'utf8')).builds;
  const relBuild = builds.find(b => b.playstyle === page.playstyle || (page.playstyle === 'hybrid' && b.id === 'starter-build'));

  const extra = {
    pageType: 'Article',
    faq: page.qa
  };

  let html = head(page.title, page.desc, page.keywords, canonical, '/og-builds.svg', extra);
  html += `
<section class="hero">
  <h1 class="glow-strong">${page.icon} ${page.h1}</h1>
  <p>${page.desc}</p>
</section>

<div style="background:var(--green-l);border:1px solid var(--green);border-radius:var(--radius);padding:18px 20px;margin-bottom:24px;">
  <p style="margin:0;font-size:15px;line-height:1.6;"><span style="font-size:18px;">⚡</span> <strong>Quick Answer:</strong> ${page.qa[0].a}</p>
</div>

<div class="result-card">
  <h3>${page.icon} Recommended Build: ${relBuild ? relBuild.name : 'See Build Advisor'}</h3>
  <p style="font-size:14px;color:var(--text2);line-height:1.6;">${relBuild ? relBuild.role : 'Use the Build Advisor tool to find your perfect match.'}</p>
  ${relBuild ? `
  <div class="build-stat-grid" style="margin-top:16px;">
    <div class="build-stat"><div class="stat-val">${relBuild.skill_trees.join(' + ')}</div><div class="stat-lbl">Skill Trees</div></div>
    <div class="build-stat"><div class="stat-val">${relBuild.difficulty}</div><div class="stat-lbl">Difficulty</div></div>
    <div class="build-stat"><div class="stat-val">${relBuild.best_for}</div><div class="stat-lbl">Best For</div></div>
    <div class="build-stat"><div class="stat-val">${relBuild.comes_online_at}</div><div class="stat-lbl">Online At</div></div>
  </div>
  <div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;">
    <a href="${p}${relBuild.guide_url.substring(1)}" class="tool-submit" style="text-decoration:none;">📖 Full ${relBuild.name} Guide →</a>
    <a href="${p}tools/build-advisor/" class="tool-submit" style="text-decoration:none;background:var(--surface);color:var(--green);border:1px solid var(--green);">🧠 Find My Build →</a>
  </div>
  ` : `<div style="margin-top:12px;"><a href="${p}tools/build-advisor/" class="tool-submit" style="text-decoration:none;">🧠 Use Build Advisor →</a></div>`}
</div>

<section class="section" style="margin-top:32px;">
  <h2>📖 ${page.h1.split(' — ')[0]}</h2>
  <div class="prose">
    <p>${page.intro}</p>

    <h3>Why This Build Works</h3>
    <p>Enshrouded's skill system rewards focus. By concentrating your 20+ skill points in 2-3 complementary trees, you unlock powerful synergies that a "jack of all trades" build can't match. ${page.playstyle === 'hybrid' ? 'A hybrid approach gives you flexibility — you can handle any situation without a respec.' : page.playstyle === 'melee' ? 'Melee builds leverage the Tank and Survivor trees for unmatched durability while still dealing competitive damage through the Center tree\'s combat nodes.' : page.playstyle === 'mage' ? 'Mage builds scale hardest with gear — a Scorching Wand with Arcane Empowerment and Pyromancy deals 3-4x the damage of an unoptimized mage.' : 'Ranged builds combine the Assassin tree\'s burst damage with the safety of distance — you control every engagement on your terms.'}</p>

    <h3>Skill Point Priority</h3>
    <p>Your first 10 skill points determine your build's identity. For this build direction:</p>
    <ol>
      <li><strong>Mobility First</strong> — Double Jump (Survivor) is non-negotiable for every build. It transforms combat and exploration.</li>
      <li><strong>Sustain Second</strong> — Water Aura (Healer) provides passive healing that keeps you alive between potions.</li>
      <li><strong>Core Mechanic Third</strong> — Invest in your build's defining skills: ${page.playstyle === 'melee' ? 'Iron Skin + Bulwark (Tank)' : page.playstyle === 'mage' ? 'Arcane Empowerment + Pyromancy (Mage)' : page.playstyle === 'ranged' ? 'Headhunter + Eagle Eye (Assassin)' : 'Battle Heal + Runner (Survivor/Center)'}.</li>
      <li><strong>Damage Fourth</strong> — Only after mobility and sustain are secured should you invest in damage nodes.</li>
    </ol>

    <h3>Gear Progression Path</h3>
    <p>Your gear progression follows Enshrouded's biome order:</p>
    <ul>
      <li><strong>Early (Lv.1-10):</strong> ${page.playstyle === 'mage' ? 'Copper Sword (physical starter) → Wooden Staff → Scorching Wand at Lv.10' : page.playstyle === 'ranged' ? 'Wooden Bow → Hunter\'s Crossbow → Ignited Bow at Lv.20' : 'Copper Sword → Noble Sword → Wailing Blade at Lv.25'}</li>
      <li><strong>Mid (Lv.10-20):</strong> ${page.playstyle === 'mage' ? 'Scorching Wand + Shroud Staff, Adventurer Set or Tidecaller' : page.playstyle === 'ranged' ? 'Ignited Bow + Hunter\'s Crossbow, Quetzal Hunter Set' : 'Noble Sword + Guardian Shield, Guard of the North Set'}</li>
      <li><strong>Late (Lv.20-30):</strong> ${page.playstyle === 'mage' ? 'Shroud Staff + Scorching Wand, Hailcaster Set' : page.playstyle === 'ranged' ? 'Ignited Bow + Dragonbone Bow, Eagle Eye Set (L25)' : 'Wailing Blade + Guardian Shield, Radiant Paladin Set'}</li>
      <li><strong>Endgame (Lv.30+):</strong> Legendary variants from Fell Dragon and Hollow King, endgame armor sets.</li>
    </ul>

    <h3>Boss-by-Boss Strategy</h3>
    <p>Each boss in Enshrouded tests a different aspect of your build. ${page.playstyle === 'melee' ? 'Melee builds excel against the Fell Warden and Matron (face-tankable) but struggle against the Wyvern (flying) and Fell Dragon (fire AoE).' : page.playstyle === 'mage' ? 'Mage builds dominate the Fell Warden and Scavenger Warlord (kite + AoE) but must play carefully against the Fell Dragon (fire resist).' : page.playstyle === 'ranged' ? 'Ranged builds have the best matchup spread — safe distance against every boss, with the Wyvern being the easiest (both ranged) and Fell Dragon requiring positioning.' : 'Hybrid builds handle every boss competently but require more preparation for the hardest fights.'}</p>

    <h3>Common Mistakes</h3>
    <ul>
      <li><strong>Spreading skill points too thin</strong> — Pick 2-3 trees and commit. Respec is cheap (Runes at any Flame Altar).</li>
      <li><strong>Ignoring food buffs</strong> — 3-4 food buffs is a 20-30% power increase. Dessert Stomach (Survivor) unlocks the 4th slot.</li>
      <li><strong>Skipping Flame Altar upgrades</strong> — Each level gates crucial crafting tiers. Upgrade proactively, not reactively.</li>
      <li><strong>Not placing temporary Flame Altars</strong> — Boss runbacks are punishing. Always place a respawn point near boss arenas.</li>
    </ul>
  </div>
</section>

<div class="cta-box" style="margin-top:32px;">
  <h3>🧠 Want a Personalized Recommendation?</h3>
  <p style="margin-bottom:12px;">Answer 4 quick questions and get your perfect build in 30 seconds — no guesswork.</p>
  <a href="${p}tools/build-advisor/" class="tool-submit" style="text-decoration:none;">🔮 Find My Build Now →</a>
  <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
    <a href="${p}builds/" class="share-btn">⚔️ All Build Guides</a>
    <a href="${p}best-skills.html" class="share-btn">⭐ Best Skills</a>
    <a href="${p}best-weapons.html" class="share-btn">🗡️ Best Weapons</a>
    <a href="${p}armor-guide.html" class="share-btn">🛡️ Armor Sets</a>
  </p>
</div>

<section class="section" style="margin-top:32px;">
  <h2><span class="icon">❓</span> Frequently Asked Questions</h2>
  <div class="prose">
    ${page.qa.map((qa, i) => `
    <details style="margin-bottom:12px;"${i === 0 ? ' open' : ''}>
      <summary style="cursor:pointer;font-weight:600;font-size:15px;">${qa.q}</summary>
      <p style="margin-top:8px;font-size:14px;color:var(--text2);">${qa.a}</p>
    </details>`).join('')}
  </div>
</section>

<div class="feedback-box">
  <p><strong>Was this page helpful?</strong></p>
  <div class="feedback-btns">
    <button class="feedback-btn" onclick="handleFeedback('yes')">👍 Yes</button>
    <button class="feedback-btn" onclick="handleFeedback('no')">👎 No</button>
  </div>
</div>
`;

  html += footer(canonical);
  return html;
}

function generateGoalPage(page) {
  const g = page.goal;
  const canonical = `/goals/${page.slug}/`;
  const p = depthPrefix(canonical);

  const title = `Enshrouded ${g.name} Guide`;
  const desc = `How to get the ${g.name} in Enshrouded. Required materials, NPC requirements${g.required_npc_id ? ' (' + g.required_npc_id.charAt(0).toUpperCase() + g.required_npc_id.slice(1) + ')' : ''}, Flame Altar Level ${g.required_flame_level}, and step-by-step unlock guide.`;

  const extra = {
    pageType: 'Article',
    faq: [
      { q: `How do I get the ${g.name} in Enshrouded?`, a: `${g.description} ${g.progression_steps[0]}. Full step-by-step path below.` },
      { q: `What materials do I need for ${g.name}?`, a: g.required_materials.length > 0 ? `You need: ${g.required_materials.map(m => m.quantity + 'x ' + m.name).join(', ')}.` : `No crafting materials required — this is obtained through ${g.type === 'boss' ? 'defeating the boss' : g.type === 'npc-unlock' ? 'rescuing the NPC' : 'exploration/looting'}.` },
      { q: `What are the prerequisites for ${g.name}?`, a: `Flame Altar Level ${g.required_flame_level}, ${g.min_level ? 'Player Level ' + g.min_level + '+,' : ''} ${g.required_npc_id ? g.required_npc_id.charAt(0).toUpperCase() + g.required_npc_id.slice(1) + ' rescued,' : ''} ${g.unlock_requirements.join(', ')}.` }
    ]
  };

  const TYPE_ICONS = { 'weapon': '⚔️', 'armor-set': '🛡️', 'base': '🏗️', 'npc-unlock': '👤', 'crafting': '🔨', 'upgrade': '🔥', 'boss': '💀' };
  const typeIcon = TYPE_ICONS[g.type] || '📋';

  let html = head(title, desc, `Enshrouded ${g.name}, how to get ${g.name}, ${g.name} guide, ${g.name} materials`, canonical, '/og-default.jpg', extra);
  html += `
<section class="hero">
  <h1 class="glow-strong">${typeIcon} ${g.name} — How to Get & Unlock Guide</h1>
  <p>${g.description}</p>
</section>

<div style="background:var(--green-l);border:1px solid var(--green);border-radius:var(--radius);padding:18px 20px;margin-bottom:24px;">
  <p style="margin:0;font-size:15px;line-height:1.6;"><span style="font-size:18px;">⚡</span> <strong>Quick Answer:</strong> ${g.progression_steps[0]}. Total of ${g.progression_steps.length} steps. ${g.required_flame_level > 1 ? 'Requires Flame Altar Level ' + g.required_flame_level + '.' : ''} ${g.required_npc_id ? 'Requires ' + g.required_npc_id.charAt(0).toUpperCase() + g.required_npc_id.slice(1) + '.' : ''}</p>
</div>

<div class="tool-widget">
  <div class="tool-section-header">📊 ${g.name} — At a Glance</div>
  <div class="build-stat-grid">
    <div class="build-stat"><div class="stat-val">Lv.${g.min_level}+</div><div class="stat-lbl">Min Player Level</div></div>
    <div class="build-stat"><div class="stat-val">🔥 ${g.required_flame_level}</div><div class="stat-lbl">Flame Altar Level</div></div>
    <div class="build-stat"><div class="stat-val">${g.required_npc_id ? g.required_npc_id.charAt(0).toUpperCase() + g.required_npc_id.slice(1) : 'None'}</div><div class="stat-lbl">NPC Required</div></div>
    <div class="build-stat"><div class="stat-val">${g.progression_steps.length}</div><div class="stat-lbl">Total Steps</div></div>
    <div class="build-stat"><div class="stat-val">${g.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div><div class="stat-lbl">Goal Type</div></div>
    <div class="build-stat"><div class="stat-val">${g.category.charAt(0).toUpperCase() + g.category.slice(1)}</div><div class="stat-lbl">Category</div></div>
  </div>
</div>

<div class="tool-widget">
  <div class="tool-section-header">📦 Required Materials</div>
  ${g.required_materials && g.required_materials.length > 0 ? `
  <div class="material-list">
    ${g.required_materials.map(m => {
      const conf = m.data_confidence === 'estimated' ? ' <span style="font-size:10px;color:var(--text3);" title="Estimated quantity">~</span>' : '';
      return `<div class="material-item"><span class="material-qty">${m.quantity}${conf}</span><span class="material-name">${m.name}</span></div>`;
    }).join('')}
  </div>
  ` : '<p style="font-size:14px;color:var(--text2);">No crafting materials required — obtained through drops, exploration, or quest completion.</p>'}
  ${g.required_materials.some(m => m.data_confidence === 'estimated') ? '<p style="font-size:11px;color:var(--text3);margin-top:8px;">⚠️ Quantities marked with ~ are estimated from crafting tier data. Gather a few extra as buffer.</p>' : ''}
</div>

${g.location ? `
<div class="tool-widget">
  <div class="tool-section-header">📍 Location</div>
  <p style="font-size:14px;color:var(--text);">${g.location}</p>
</div>` : ''}

<div class="tool-widget">
  <div class="tool-section-header">🔓 Prerequisites</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
    ${g.unlock_requirements.map(r => `<span style="display:inline-block;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:6px 12px;font-size:13px;color:var(--text);">🔓 ${r}</span>`).join('')}
  </div>
</div>

<div class="tool-widget">
  <div class="tool-section-header">🪜 Step-by-Step Progression Path</div>
  <ol class="step-list">
    ${g.progression_steps.map(s => `<li><div class="step-label">${s}</div></li>`).join('')}
  </ol>
</div>

<section class="section" style="margin-top:32px;">
  <h2>📖 Detailed Guide: How to Get the ${g.name}</h2>
  <div class="prose">
    <p>The ${g.name} is a ${g.type.replace(/-/g, ' ')} in the <strong>${g.category}</strong> category. ${g.description}</p>

    <h3>Preparation</h3>
    <p>Before you start working toward the ${g.name}, make sure you have:</p>
    <ul>
      <li><strong>Player Level:</strong> ${g.min_level}+ (higher is always better)</li>
      <li><strong>Flame Altar:</strong> Level ${g.required_flame_level} minimum</li>
      ${g.required_npc_id ? `<li><strong>NPC:</strong> ${g.required_npc_id.charAt(0).toUpperCase() + g.required_npc_id.slice(1)} must be rescued and placed at your base</li>` : '<li><strong>NPC:</strong> No specific NPC required</li>'}
      ${g.required_materials.length > 0 ? `<li><strong>Materials:</strong> Gather all ${g.required_materials.length} material types listed above before starting</li>` : ''}
      <li><strong>Food Buffs:</strong> Always have 3-4 food buffs active before challenging content</li>
    </ul>

    <h3>Step-by-Step Walkthrough</h3>
    ${g.progression_steps.map((s, i) => `<p><strong>Step ${i + 1}:</strong> ${s}</p>`).join('\n    ')}

    <h3>Tips & Tricks</h3>
    <ul>
      <li>Place temporary Flame Altars near resource-rich areas or boss arenas for easy respawn.</li>
      <li>Cook food buffs before resource farming — the right buffs can double your yield per trip.</li>
      ${g.type === 'boss' ? '<li>Bring 50+ arrows even for melee builds — some bosses have flying phases that require ranged attacks.</li>' : ''}
      ${g.type === 'weapon' ? '<li>Check the <a href="' + p + 'best-weapons.html">Best Weapons Tier List</a> to see how this weapon compares to alternatives.</li>' : ''}
      ${g.type === 'armor-set' ? '<li>Scaling armor sets (like Radiant Paladin and Eagle Eye) are worth farming early — they scale with you from Level 13 to 25.</li>' : ''}
    </ul>

    <h3>What's Next After Getting the ${g.name}?</h3>
    <p>Once you've obtained the ${g.name}, your next goals should be:</p>
    <ul>
      ${g.category === 'equipment' ? '<li>Upgrade your remaining gear slots to match</li><li>Test your new equipment against the next boss in progression</li><li>Optimize gems and food buffs for your upgraded build</li>' : ''}
      ${g.category === 'progression' ? '<li>Use your new unlock to access previously gated content</li><li>Continue advancing through the biome progression: Springlands → Revelwoods → Nomad Highlands → Kindlewastes</li>' : ''}
      ${g.category === 'building' ? '<li>Rescue remaining NPCs and build them dedicated rooms</li><li>Upgrade your Flame Altar for expanded build area</li><li>Add crafting stations, storage, and defensive structures</li>' : ''}
    </ul>
  </div>
</section>

<div class="cta-box" style="margin-top:32px;">
  <h3>🎯 Want to Plan Your Next Goal?</h3>
  <p style="margin-bottom:12px;">Search for any item, boss, or progression milestone — get the exact materials and steps.</p>
  <a href="${p}tools/goal-planner/" class="tool-submit" style="text-decoration:none;">🔍 Open Goal Planner →</a>
  <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
    ${g.related_guide_urls.map(url => `<a href="${p}${url.substring(1)}" class="share-btn">📖 ${url.replace(/\//g, ' ').replace(/\.html/g, '').replace(/-/g, ' ').trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</a>`).join('\n    ')}
  </p>
</div>

<div class="changelog-box" style="background:var(--muted-bg);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;">
  <h4 style="margin-top:0;">📝 Data Confidence</h4>
  <p style="font-size:13px;color:var(--text3);margin:0;">Material quantities are derived from in-game crafting tiers. Entries marked "estimated" have not been verified against exact game data. Last updated: ${TODAY}.</p>
</div>

<div class="feedback-box">
  <p><strong>Was this page helpful?</strong></p>
  <div class="feedback-btns">
    <button class="feedback-btn" onclick="handleFeedback('yes')">👍 Yes</button>
    <button class="feedback-btn" onclick="handleFeedback('no')">👎 No</button>
  </div>
</div>
`;

  html += footer(canonical);
  return html;
}

function generateProgressionPage(page) {
  const canonical = `/progression/${page.slug}/`;
  const p = depthPrefix(canonical);

  const extra = {
    pageType: 'Article',
    faq: page.qa
  };

  let html = head(page.title, page.desc, page.keywords, canonical, '/og-default.jpg', extra);
  html += `
<section class="hero">
  <h1 class="glow-strong">${page.icon} ${page.h1}</h1>
  <p>${page.desc}</p>
</section>

<div style="background:var(--green-l);border:1px solid var(--green);border-radius:var(--radius);padding:18px 20px;margin-bottom:24px;">
  <p style="margin:0;font-size:15px;line-height:1.6;"><span style="font-size:18px;">⚡</span> <strong>Quick Answer:</strong> ${page.qa[0].a}</p>
</div>

<div class="tool-widget">
  <div class="tool-section-header">👤 For: ${page.persona}</div>
  <div class="tool-section-desc">${page.intro}</div>
</div>

<section class="section" style="margin-top:32px;">
  <h2>📖 ${page.h1}</h2>
  <div class="prose">
    <p>${page.intro}</p>

    <h3>Your Optimal Action Plan</h3>
    <p>Based on the ${page.persona.toLowerCase()} progression path, here's what you should focus on — in priority order:</p>
    <ol>
      ${page.stage === 'early' ? `
      <li><strong>Complete the tutorial</strong> — Exit Cinder Vault, commune with The Flame, place your first Flame Altar.</li>
      <li><strong>Rescue the Blacksmith</strong> — This is your #1 priority NPC. Unlocks Glider, Grappling Hook, and all weapon crafting.</li>
      <li><strong>Craft the Glider and Grappling Hook</strong> — These two items transform exploration. Get them before doing anything else.</li>
      <li><strong>Unlock Double Jump and Water Aura</strong> — The two most impactful early skill points in the game.</li>
      <li><strong>Upgrade Flame Altar to Level 2</strong> — Extends Shroud timer and unlocks basic crafting upgrades.</li>` : page.stage === 'mid' ? `
      <li><strong>Upgrade Flame Altar to Level 3</strong> — Gates Iron crafting tier, Revelwoods access, and mid-game content.</li>
      <li><strong>Rescue all 5 core NPCs</strong> — Blacksmith, Alchemist, Carpenter, Farmer, Hunter. Unlock the full crafting ecosystem.</li>
      <li><strong>Upgrade to Iron-tier weapons and armor</strong> — Noble Sword, Fell Axe, or Scorching Wand. Guard of the North or Adventurer set.</li>
      <li><strong>Defeat the Fell Warden</strong> — Your first major boss. Level 6-7 recommended, bring 50+ arrows.</li>
      <li><strong>Specialize your build</strong> — Commit to Melee Tank, Mage DPS, or Archer Assassin by Level 12.</li>` : page.stage === 'endgame' ? `
      <li><strong>Max out Flame Altar (Level 5)</strong> — Required for legendary crafting and endgame boss access.</li>
      <li><strong>Craft or farm Legendary weapons</strong> — Wailing Blade, Dragonbone Bow, Hollow King's Scepter.</li>
      <li><strong>Equip endgame armor</strong> — Sunpiercer (Heavy), Eagle Eye L25 (Medium), Hailcaster/Radiance (Light).</li>
      <li><strong>Defeat Fell Dragon and Hollow King</strong> — The two endgame bosses. Max preparation required.</li>
      <li><strong>Optimize and complete</strong> — Perfect gems, food buffs, Shroud Roots, and build your dream base.</li>` : ''}
    </ol>

    <h3>Key Milestones on This Path</h3>
    <p>As you follow this progression path, you'll hit several major milestones:</p>
    <ul>
      ${page.stage === 'early' ? `
      <li><strong>First Flame Altar:</strong> Your permanent base location. Choose carefully — near wood, stone, and water.</li>
      <li><strong>Blacksmith Rescued:</strong> Game-changer. Glider + Grappling Hook open the vertical world.</li>
      <li><strong>First Boss Down:</strong> Fell Warden marks the transition from tutorial to real game.</li>` : page.stage === 'mid' ? `
      <li><strong>Revelwoods Entry:</strong> New biome, new materials, new enemies. Iron nodes are abundant here.</li>
      <li><strong>Iron Tier Complete:</strong> Full Iron weapons + armor means you're ready for any mid-game challenge.</li>
      <li><strong>Wyvern Defeated:</strong> Proves your build is working. Wyvern Scale enables key upgrades.</li>` : page.stage === 'endgame' ? `
      <li><strong>Kindlewastes Entry:</strong> The harshest biome. Scarce water, relentless enemies, endgame materials.</li>
      <li><strong>First Legendary:</strong> Getting your first legendary weapon is a massive power spike.</li>
      <li><strong>Fell Dragon Defeated:</strong> The hardest boss in the game. You've beaten Enshrouded.</li>` : ''}
    </ul>

    <h3>Common Pitfalls to Avoid</h3>
    <ul>
      <li><strong>Skipping Flame Altar upgrades</strong> — Each level gates crucial content. Upgrade before you need to.</li>
      <li><strong>Ignoring temporary Flame Altars</strong> — Place them near bosses and resource-rich areas. The 5-Stone cost is trivial.</li>
      <li><strong>Not cooking food buffs</strong> — 3-4 food buffs can double your effective power. Always eat before challenging content.</li>
      <li><strong>Rushing biomes underleveled</strong> — Enemies scale hard between biomes. If you're dying in 2 hits, you're underleveled or undergeared.</li>
    </ul>
  </div>
</section>

<div class="cta-box" style="margin-top:32px;">
  <h3>🗺️ Want a Personalized Plan?</h3>
  <p style="margin-bottom:12px;">Tell us your exact level, gear, and unlocked NPCs — get a custom action plan generated just for you.</p>
  <a href="${p}tools/adventure-planner/" class="tool-submit" style="text-decoration:none;">🗺️ Generate My Plan →</a>
  <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
    <a href="${p}beginner-guide.html" class="share-btn">📖 Beginner Walkthrough</a>
    <a href="${p}map.html" class="share-btn">🗺️ Map &amp; Locations</a>
    <a href="${p}boss-guide.html" class="share-btn">💀 Boss Guide</a>
    <a href="${p}tools/goal-planner/" class="share-btn">🎯 Goal Planner</a>
  </p>
</div>

<section class="section" style="margin-top:32px;">
  <h2><span class="icon">❓</span> Frequently Asked Questions</h2>
  <div class="prose">
    ${page.qa.map((qa, i) => `
    <details style="margin-bottom:12px;"${i === 0 ? ' open' : ''}>
      <summary style="cursor:pointer;font-weight:600;font-size:15px;">${qa.q}</summary>
      <p style="margin-top:8px;font-size:14px;color:var(--text2);">${qa.a}</p>
    </details>`).join('')}
  </div>
</section>

<div class="changelog-box" style="background:var(--muted-bg);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;">
  <h4 style="margin-top:0;">📝 About This Page</h4>
  <p style="font-size:13px;color:var(--text3);margin:0;">Generated progression path based on the standard Enshrouded game stages. Your optimal path may vary based on build choice and playstyle. For a fully personalized plan, use the <a href="${p}tools/adventure-planner/">Adventure Planner</a>. Last updated: ${TODAY}.</p>
</div>

<div class="feedback-box">
  <p><strong>Was this page helpful?</strong></p>
  <div class="feedback-btns">
    <button class="feedback-btn" onclick="handleFeedback('yes')">👍 Yes</button>
    <button class="feedback-btn" onclick="handleFeedback('no')">👎 No</button>
  </div>
</div>
`;

  html += footer(canonical);
  return html;
}

// ===== MAIN GENERATION =====
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

let totalPages = 0;
let totalWords = 0;

console.log('🔨 EnshroudedGuides.com SEO Page Generator');
console.log(`📅 Date: ${TODAY}`);
console.log('');

// Phase 3: Build Advisor SEO Pages
console.log('📦 Phase 3: Build Advisor SEO Pages');
for (const page of BUILD_PAGES) {
  const dir = path.join(ROOT, 'builds/recommended', page.slug);
  ensureDir(dir);
  const html = generateBuildPage(page);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  const words = html.split(/\s+/).length;
  totalPages++;
  totalWords += words;
  console.log(`  ✅ ${page.slug} (${words} words)`);
}

// Phase 5: Goal Planner SEO Pages
console.log('\n📦 Phase 5: Goal Planner SEO Pages');
for (const page of GOAL_PAGES) {
  const dir = path.join(ROOT, 'goals', page.slug);
  ensureDir(dir);
  const html = generateGoalPage(page);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  const words = html.split(/\s+/).length;
  totalPages++;
  totalWords += words;
  console.log(`  ✅ ${page.slug} (${words} words)`);
}

// Phase 7: Adventure Planner SEO Pages
console.log('\n📦 Phase 7: Adventure Planner SEO Pages');
for (const page of PROGRESSION_PAGES) {
  const dir = path.join(ROOT, 'progression', page.slug);
  ensureDir(dir);
  const html = generateProgressionPage(page);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  const words = html.split(/\s+/).length;
  totalPages++;
  totalWords += words;
  console.log(`  ✅ ${page.slug} (${words} words)`);
}

console.log(`\n🎉 Done! Generated ${totalPages} pages, ~${Math.round(totalWords / totalPages)} avg words/page, ${totalWords} total words.`);
