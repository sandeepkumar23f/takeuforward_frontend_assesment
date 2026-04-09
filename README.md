# Wall Calendar App

A weekend project I built - an interactive wall calendar that lets you select date ranges, add notes, and change the hero image. Works on both desktop and mobile.

![Calendar Preview](https://via.placeholder.com/800x400?text=Calendar+Screenshot)

## Why I built this

Had a deadline to submit a frontend challenge and wanted something that actually feels like a physical wall calendar you'd hang in your home. The image swapping feature was a last-minute addition but turned out to be my favorite part.

## What it does

- **Pick any date range** - Click a start date, click an end date. The days in between get highlighted.
- **Jot down notes** - There's a notes section at the bottom. I use it for remembering deadlines and events.
- **Change the cover image** - Click "Change Image" on the hero image. Comes with 4 preset nature-themed images or upload your own.
- **Saves everything** - Your selected dates, notes, and chosen image stick around even after you close the browser. Uses localStorage for that.
- **Works on your phone** - Layout stacks vertically on mobile. Touch targets are big enough so you don't mis-click.

## Tech stack

- Next.js 14 (App Router)
- TypeScript (because I like knowing what props a component expects)
- Tailwind CSS (speeds up styling a lot)
- Lucide React (for the icons)

No backend, no database. Everything runs in the browser.

## Getting it running locally

1. Clone the repo:
bash
git clone [your-repo-url]
cd wall-calendar
Install dependencies:

bash
npm install
Run the dev server:

bash
npm run dev
Open http://localhost:3000

That's it. No environment variables or build steps needed.

How to use it
Selecting dates:

Click any date to start your selection

Click another date to finish the range

The start and end dates show up with a purple gradient

Days in between have a light blue background

Hit "Clear Selection" if you want to start over

Adding notes:

Click "Edit Notes" at the bottom

Type whatever you want to remember

Click "Save Notes" - it saves automatically

Changing the image:

Hover over the calendar image

Click "Change Image"

Pick from the 4 preset images (Mountains, Forest, Beach, City)

Or click the upload box to use your own photo

Month navigation:

Use the left/right arrows to switch months

Your selected range stays selected when you switch (might be a bug but I kept it because it's useful)

Project structure
text
wall-calendar/
├── app/
│   ├── page.tsx          # Main layout, state management
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles + animations
├── components/
│   ├── Calendar.tsx      # The date grid and selection logic
│   ├── NotesSection.tsx  # Notes editor with edit/save
│   └── ImageSelector.tsx # Image picker modal
├── public/               # Static assets (if any)
└── package.json
Things I'd add if I had more time
Drag to select multiple dates (would be faster than clicking)

Add events to specific dates with different colors

Month view toggle (maybe week view or agenda view)

Export calendar as PDF

Dark mode (the white background burns my eyes at night)

Known quirks
The SVG preset images are embedded as data URLs so they work without internet, but they're a bit basic looking

Uploaded images are stored in localStorage as data URLs, so don't upload huge files (under 1MB is best)

Month navigation preserves selection - I actually like this behavior so kept it

Browser support
Tested on:

Chrome (latest)

Firefox (latest)

Safari (latest)

Mobile Chrome/Safari

Should work on anything that supports modern JavaScript and CSS Grid.

Screenshots
Desktop view: 

Mobile view: [Add screenshot here]
Image selector modal: <img width="686" height="526" alt="image" src="https://github.com/user-attachments/assets/e8593af2-f013-44ac-8905-5692186c296a" />
