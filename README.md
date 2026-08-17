<h1 align="center">Skill Icons</h1>

<p align="center">A simple SVG icon generator for programming languages and technologies.</p>

---

## 🤝 Help Needed!

This project needs your help! I'm looking for contributors to:

- Add more programming language icons
- Improve existing icons
- Add new technology icons
- Help with the API functionality
- Test and report bugs

##

<h1 align="center">Icons</h1>

## 🚀 How to Use

You can generate custom icon combinations using your own API! Here's an example:

**Example icons used above:**

<p align="center">
<img src="public/icons/javascript.svg" width="32" alt="JavaScript">
<img src="public/icons/python.svg" width="32" alt="Python">
<img src="public/icons/typescript.svg" width="32" alt="TypeScript">
<img src="public/icons/nodejs.svg" width="32" alt="Node.js">
<img src="public/icons/docker.svg" width="32" alt="Docker">
<img src="public/icons/chatgpt.svg" width="32" alt="ChatGPT">
<img src="public/icons/github.svg" width="32" alt="GitHub">
</p>

### 📝 API Parameters

**Icon Selection (`i=`):**

- Use the icon names from the list below
- Separate multiple icons with commas
- Example: `i=vite,npm,pnpm,docker,webpack,clerk`

**Icons Per Line (`perline=`):**

- Control how many icons appear in each row
- Default: 15, Maximum: 15
- Example: `perline=5` for 5 icons per line

**Theme (`t=`):**

- Change the theme of themed icons (if available)
- Default: `dark`
- Example: `t=light` for light theme
- Note: Only affects icons that have multiple theme versions

### 🔗 API URL Format

```
https://your-domain.vercel.app/api/icons?i=icon1,icon2,icon3&perline=number&t=theme
```

## 🚀 Deploy Your Own

To use this project, simply:

1. **Fork this repository** to your GitHub account
2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your forked repository
   - Deploy with default settings
3. **Replace the domain** in the URL format above with your Vercel domain
4. **All parameters remain the same**: `i=`, `perline=`, `t=` work exactly as shown

<p align="center">
<img src="public/icons/vercel.svg" width="48" alt="Vercel"> 
</p>

**Vercel makes deployment super easy!**

Here's a list of all the icons currently supported. Feel free to open an issue to suggest icons to add!

|  #  |      Icon ID       |                         Icon                          |
| :-: | :----------------: | :---------------------------------------------------: |
|   1  |  `androidstudio`   | <img src="public/icons/androidstudio.svg" width="48"> |
|   2  |  `angular`         | <img src="public/icons/angular.svg" width="48"> |
|   3  |  `antigravity`     | <img src="public/icons/antigravity.svg" width="48"> |
|   4  |  `authjs`          | <img src="public/icons/authjs.svg" width="48"> |
|   5  |  `aws`             | <img src="public/icons/aws.svg" width="48"> |
|   6  |  `chakraui`        | <img src="public/icons/chakraui.svg" width="48"> |
|   7  |  `chatgpt`         | <img src="public/icons/chatgpt.svg" width="48"> |
|   8  |  `claude`          | <img src="public/icons/claude.svg" width="48"> |
|   9  |  `clerk`           | <img src="public/icons/clerk.svg" width="48"> |
|  10  |  `cloudinary`      | <img src="public/icons/cloudinary.svg" width="48"> |
|  11  |  `codex`           | <img src="public/icons/codex.svg" width="48"> |
|  12  |  `css`             | <img src="public/icons/css3.svg" width="48"> |
|  13  |  `cursorai`        | <img src="public/icons/cursorai.svg" width="48"> |
|  14  |  `deepseek`        | <img src="public/icons/deepseek.svg" width="48"> |
|  15  |  `django`          | <img src="public/icons/django.svg" width="48"> |
|  16  |  `docker`          | <img src="public/icons/docker.svg" width="48"> |
|  17  |  `drizzle`         | <img src="public/icons/drizzle.svg" width="48"> |
|  18  |  `expo`            | <img src="public/icons/expo.svg" width="48"> |
|  19  |  `express`         | <img src="public/icons/express.svg" width="48"> |
|  20  |  `figma`           | <img src="public/icons/figma.svg" width="48"> |
|  21  |  `framer`          | <img src="public/icons/framermotion.svg" width="48"> |
|  22  |  `gemini`          | <img src="public/icons/gemini.svg" width="48"> |
|  23  |  `git`             | <img src="public/icons/git.svg" width="48"> |
|  24  |  `github`          | <img src="public/icons/github.svg" width="48"> |
|  25  |  `githubcopilot`   | <img src="public/icons/githubcopilot.svg" width="48"> |
|  26  |  `gsap`            | <img src="public/icons/gsap.svg" width="48"> |
|  27  |  `heroui`          | <img src="public/icons/heroui.svg" width="48"> |
|  28  |  `html`            | <img src="public/icons/html5.svg" width="48"> |
|  29  |  `inngest`         | <img src="public/icons/inngest.svg" width="48"> |
|  30  |  `jenkins`         | <img src="public/icons/jenkins.svg" width="48"> |
|  31  |  `jest`            | <img src="public/icons/jest.svg" width="48"> |
|  32  |  `js`              | <img src="public/icons/javascript.svg" width="48"> |
|  33  |  `jwt`             | <img src="public/icons/jwt.svg" width="48"> |
|  34  |  `k8s`             | <img src="public/icons/k8s.svg" width="48"> |
|  35  |  `kali`            | <img src="public/icons/kali.svg" width="48"> |
|  36  |  `kubernetes`      | <img src="public/icons/kubernetes.svg" width="48"> |
|  37  |  `leetcode`        | <img src="public/icons/leetcode.svg" width="48"> |
|  38  |  `linux`           | <img src="public/icons/Linux.svg" width="48"> |
|  39  |  `magicui`         | <img src="public/icons/magicui.svg" width="48"> |
|  40  |  `mantineui`       | <img src="public/icons/mantineui.svg" width="48"> |
|  41  |  `materialui`      | <img src="public/icons/materialUI.svg" width="48"> |
|  42  |  `mongo`           | <img src="public/icons/mongodb.svg" width="48"> |
|  43  |  `mysql`           | <img src="public/icons/mysql.svg" width="48"> |
|  44  |  `nativewind`      | <img src="public/icons/nativewind.svg" width="48"> |
|  45  |  `nestjs`          | <img src="public/icons/nestjs.svg" width="48"> |
|  46  |  `netlify`         | <img src="public/icons/netlify.svg" width="48"> |
|  47  |  `nextjs`          | <img src="public/icons/nextjs.svg" width="48"> |
|  48  |  `node`            | <img src="public/icons/nodejs.svg" width="48"> |
|  49  |  `npm`             | <img src="public/icons/npm.svg" width="48"> |
|  50  |  `nuxtjs`          | <img src="public/icons/nuxtjs.svg" width="48"> |
|  51  |  `oauth`           | <img src="public/icons/OAuth.svg" width="48"> |
|  52  |  `passportjs`      | <img src="public/icons/passportjs.svg" width="48"> |
|  53  |  `pieces`          | <img src="public/icons/pieces.svg" width="48"> |
|  54  |  `pnpm`            | <img src="public/icons/pnpm.svg" width="48"> |
|  55  |  `postgres`        | <img src="public/icons/postgres.svg" width="48"> |
|  56  |  `postman`         | <img src="public/icons/postman.svg" width="48"> |
|  57  |  `prisma`          | <img src="public/icons/prisma.svg" width="48"> |
|  58  |  `prismic`         | <img src="public/icons/prismic.svg" width="48"> |
|  59  |  `py`              | <img src="public/icons/python.svg" width="48"> |
|  60  |  `react`           | <img src="public/icons/react.svg" width="48"> |
|  61  |  `reactnative`     | <img src="public/icons/reactnative.svg" width="48"> |
|  62  |  `reactrouter`     | <img src="public/icons/reactrouter.svg" width="48"> |
|  63  |  `redis`           | <img src="public/icons/redis.svg" width="48"> |
|  64  |  `redux`           | <img src="public/icons/redux.svg" width="48"> |
|  65  |  `sanity`          | <img src="public/icons/sanity.svg" width="48"> |
|  66  |  `shadcn`          | <img src="public/icons/shadcn.svg" width="48"> |
|  67  |  `skiperui`        | <img src="public/icons/skiperui.svg" width="48"> |
|  68  |  `socketio`        | <img src="public/icons/soketio.svg" width="48"> |
|  69  |  `stripe`          | <img src="public/icons/stripe.svg" width="48"> |
|  70  |  `tailwind`        | <img src="public/icons/tailwindcss.svg" width="48"> |
|  71  |  `threejs`         | <img src="public/icons/threejs.svg" width="48"> |
|  72  |  `tryhackme`       | <img src="public/icons/tryhackme.svg" width="48"> |
|  73  |  `ts`              | <img src="public/icons/typescript.svg" width="48"> |
|  74  |  `ubuntu`          | <img src="public/icons/Ubuntu.svg" width="48"> |
|  75  |  `vercel`          | <img src="public/icons/vercel.svg" width="48"> |
|  76  |  `vite`            | <img src="public/icons/vite.svg" width="48"> |
|  77  |  `vscode`          | <img src="public/icons/vsCode.svg" width="48"> |
|  78  |  `webhooks`        | <img src="public/icons/webhooks.svg" width="48"> |
|  79  |  `webpack`         | <img src="public/icons/webpack.svg" width="48"> |
|  80  |  `windows`         | <img src="public/icons/windows.svg" width="48"> |
|  81  |  `windsurf`        | <img src="public/icons/windsurf.svg" width="48"> |
|  82  |  `zod`             | <img src="public/icons/zod.svg" width="48"> |
|  83  |  `zustand`         | <img src="public/icons/zustand.svg" width="48"> |

---

<h1 align="center">⚠️ EXTREMELY DANGEROUS LICENSE ⚠️</h1>

<p align="center"><strong>Proceed only if you have a fire extinguisher, surge protector, and a will. 😈</strong></p>

## ☣️ TERMS OF MAYHEM

By using this repository, you agree that you may:

- 💥 **Detonate your productivity**
- 🔥 **Thermally challenge your CPU** (it will scream)
- 🧟 **Awaken ancient CLI spirits** with a single typo
- 🕵️ **Copy, fork, remix, and weaponize** this code (ethically, we hope)
- 🌀 **Summon infinite side-projects** you will never finish
- 📡 **Broadcast chaos** to unsuspecting teammates and CI pipelines

If any of the above happens, you agree it's hilarious and entirely your fault.

## 📜 THE ACTUAL LICENSE

```
MIT License - Do whatever you want!
But remember: With great power comes great responsibility...
and possibly a fried motherboard!
No warranty. No promises. No refunds. Batteries not included.
```

**Disclaimer**: No computers were actually harmed in the making of this project.
But we're not responsible if you try to run it on a potato! 🥔

---

**⭐ Star this repo if you survived reading this license! ⭐**





