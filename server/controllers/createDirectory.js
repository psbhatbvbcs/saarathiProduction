import fs from "fs/promises";

export const createDirectory = async (req, res, next) => {
  try {
    const { department, sem, subjects } = req.body;

    // Create department directory
    await fs.mkdir(`./public/files/${department}`, { recursive: true });
  
    // Create sem directories
    for (let i = 1; i <= 8; i++) {
      await fs.mkdir(`./public/files/${department}/sem${i}`, { recursive: true });
    }
  
    // Create subject directories
    const subjectArr = subjects.split(',');
    for (const subject of subjectArr) {
      await fs.mkdir(`./public/files/${department}/sem${sem}/${subject.trim()}`, { recursive: true });
    }
  
    res.send('Directories created successfully');
  } catch (error) {
  }
}
