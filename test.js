import Parser from 'rss-parser';
const parser = new Parser();
const url = 'https://www.firstinspires.org/robotics/frc/blog-rss';
(async () => {
    const feed = await parser.parseURL(url);
    console.log(feed.items);
})();