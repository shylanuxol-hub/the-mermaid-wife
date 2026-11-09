# The Mermaid Wife
 
A clickable retelling of *The Mermaid Wife*, a seal-woman legend from Unst in the Shetland Islands. It is classified as a Swan Maiden tale (ATU 400 / 400*) and as Christiansen's migratory legend ML 4080, "The Seal Woman."
 
The reader moves through the story by clicking fragments of text and images. Hovering over a choice shows what it really means before you commit to it. Hovering over the wife's lines brings her unspoken thoughts onto the page, and dotted words open notes on Shetland dialect, folklore motifs and the tale's other versions. There are five endings.
 
**Live version:**
 
Made for *Fairy Tale Interactive Narrative* assignment for Contemporary Topics in Interactive Media by Shyla Nuxol, 2026.
 
## Running it locally
 
There is no build step. Open `index.html` in a browser, or use the Live Server extension in VS Code.
 
To jump straight to a scene, add its name to the end of the address, for example `index.html#years`.
Scene names: `title`, `shore`, `plea`, `years`, `seal`, `ask`, `finding`, `confront`, `about`,
`end_watch`, `end_returned`, `end_kept`, `end_farewell`, `end_empty`.
 
## Files
 
```
index.html    page shell and fonts
style.css     colors, type, layout, hover effects
script.js     every scene, choice and ending
images/       all images (file names are case-sensitive online)
```
 
## Editing
 
All story content lives in the `scenes` object in `script.js`.
 
| Field | What it does |
|---|---|
| `head` | narration at the top of the page |
| `choices` | the clickable fragments: `a` = text shown, `b` = text on hover, `go` = next scene |
| `img` / `imgB` | the image for a choice and the image it becomes on hover |
| `pop: { x, y, w }` | makes the hover image appear somewhere else on the page |
| `x`, `y`, `w` | position (% from left and top) and width (% of the screen) |
| `decor` | faint, non-clickable background images |
| `whisperAt: [x, y]` | where the wife's unspoken thoughts appear |
| `note(word, text)` | dotted word with a footnote shown on hover |
| `her(line, thought)` | a line of hers that reveals her inner thought on hover |
 
The endings are listed at the bottom of `scenes`, and each calls `ending(title, tone, text, whisper)`.
 
Each reader's browser keeps track of the endings they have reached. To reset that count, run
`localStorage.removeItem("mw-endings")` in the browser console.
 
## Sources
 
- Hibbert, Samuel. *A Description of the Shetland Islands*. Edinburgh, 1822.
- Keightley, Thomas. *The Fairy Mythology*. London, 1850.
- Tibbitts, Charles John. *Folk-Lore and Legends: Scotland*. London: W. W. Gibbings, 1889.
- Dennison, Walter Traill. "The Goodman o' Wastness." Orkney, 1890s.
- Ashliman, D. L. *The Mermaid Wife: Migratory Legends of Christiansen Type 4080*. https://sites.pitt.edu/~dash/type4080.html

## Inspiration
 
- Olia Lialina, *My Boyfriend Came Back from the War* (1996)
- Shelley Jackson, *my body — a Wunderkammer* (1997)
- JODI, *wwwwwwwww.jodi.org* (1995)

## Image credits
 
- Henri-Charles Guérard, *Moonlight in the Harbor at Dieppe*, c. 1885. Public domain, via the National Gallery of Art.
- Watercolor seal illustration: Kateryna, Adobe Stock.
- Silhouette of a mermaid swimming: Delmaine Donson / peopleimages.com, Adobe Stock.
- Two brown haystacks: Roman Synkevych, Unsplash.
- Brown and white wooden ceiling: Charlotte Groß-Hohnacker, Unsplash.
- Antique chest: Aysegul Aytören, Unsplash.
- Gray seal sketch: Henry W. Elliott, Wikimedia Commons (public domain).
- Boat: public domain.

Adobe Stock images are licensed for use in this project only and may not be reused or redistributed.
 
## Fonts
 
IM Fell English and Cormorant Garamond, via Google Fonts (SIL Open Font License).