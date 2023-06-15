# Roomy Prompt - ChatGPT Rooms

![Proomy](static/screenshot.png)

## Overview
"Roomy Prompt" is an open-source tool that creates AI integrated chatrooms. Designed for individuals or companies, it sets up unique chat rooms, each powered by a dedicated ChatGPT bot to respond to queries based on the room's header info.

## Setup and Usage

To start, setup your `.env` file with Supabase, Github OAuth, Google OAuth, and OpenAI credentials:

```bash
cp _env .env
```

After setting up the `.env` file, you can clone the repository:

```bash
git clone https://github.com/Zizwar/PRoomy.git
```

Then, start the application:

```bash
deno task start
```

## Development

To contribute to the project:

1. Fork the repository.
2. Clone the repository:
```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/PRoomy.git
```
3. Create a new branch:
```bash
git checkout -b <YOUR_BRANCH_NAME>
```
4. Make your changes.
5. Commit your changes:
```bash
git commit -m "Add my changes"
```
6. Push to the branch:
```bash
git push origin <YOUR_BRANCH_NAME>
```
7. Open a pull request from your forked repository to this repository.

## Features

- Open-source, AI integrated chatrooms.
- Each room powered by a unique ChatGPT bot.
- Full administrative control for room creators.

## Dependencies 

Built using:

- [Fresh](https://fresh.deno.dev)
- [Supabase](https://supabase.io)
- [twind](https://twind.dev)
- [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
- [OpenAI API](https://oepnai.com)

All these services are free of charge. The deployment is done on [Deno Deploy](https://deno.com/deploy).

## Acknowledgements

- Inspired by [Deno Chat](https://showcase-chat.deno.dev/)
- Design adapted from [Messaging App UI](https://codepen.io/TurkAysenur/pen/ZEbXoRZ)

## Demo
See the live demo [here](https://jpt.ma/proomy).

## Project Link
[https://github.com/Zizwar/PRoomy/](https://github.com/Zizwar/PRoomy/)

## Contact
Brahim Bidi - [https://brah.im](https://brah.im)
