import fs from 'fs';
import path from 'path'

const fullnames = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    node: "nodejs",
    mongo: "mongodb",
    tailwind: 'tailwindcss',
    html: 'html5',
    css: 'css3',
}

const themedIcons = {

};

export default function Handler(req,res){
    const {i,t="dark",perline=5} = req.query;

    if(!i){
        res.status(400).send('missing ?i=icons')
    }

    const icons = i.split(',').map((name)=>{
        const fullName = fullnames[name] || name;
        const finalName = themedIcons.Includes(fullName)?`${fullName}-${t}`:fullName;
        const filePath = path.resolve(`./public/icons/${finalName}.svg`);

        try {
            return fs.readFileSync(filePath,'utf8')
        } catch (error) {
           return `<text x=\"0\" y=\"15\" fill=\"red\">${name} not found</text>`;
        }
    })

    const spacing = 56;
    const width = spacing * icons.length;
      const svg = `
    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\" height=\"56\" viewBox=\"0 0 ${width} 56\">
      ${icons.map((icon, i) => `<g transform=\"translate(${i * spacing}, 0)\">${icon}</g>`).join('')}
    </svg>
  `;

   res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);

}