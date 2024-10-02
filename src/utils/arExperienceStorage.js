const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/arExperiences.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, '[]');
  }
}

async function readExperiences() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeExperiences(experiences) {
  await fs.writeFile(DATA_FILE, JSON.stringify(experiences, null, 2));
}

async function saveExperience(experience) {
  const experiences = await readExperiences();
  experience.id = Date.now().toString();
  experiences.push(experience);
  await writeExperiences(experiences);
  return experience;
}

async function getExperience(id) {
  const experiences = await readExperiences();
  return experiences.find(exp => exp.id === id);
}

module.exports = {
  saveExperience,
  getExperience
};