<div align="center">
  <img src="./public/logo192.png" width="192">
</div>

![vercel](https://vercelbadge.vercel.app/api/acro5piano/image-annotator)
[![test](https://github.com/acro5piano/image-annotator/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/image-annotator/actions/workflows/test.yml)

# Image Annotator

A tool to edit images by keyboard. Especially useful when you add some description to a cropped screenshot.

# Concept

- **Productive** Edit photo only with keyboard, meaning you don't have to touch your mouse.
- **Fast** Use best practice of recent web technologies
- **Cross-platform** Works on all modern browsers
- **Secure** No upload, no permission

# Usage

Go to the website, and paste your image from clipboard.

https://image-annotator.com

# Shortcuts

| Key                               | Description                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| ?                                 | Open the cheatsheet                                                                  |
| C-v                               | Paste the image from clipboard to the canvas                                         |
| C-c                               | Copy the image on the canvas to clipboard                                            |
| r                                 | Add a rectangle on the canvas                                                        |
| R                                 | Add a filled rectangle on the canvas (e.g. hide something)                           |
| t                                 | Add a text on the canvas. If a rectangle is focused, put the text on the above of it |
| o                                 | Focus next element on canvas                                                         |
| Escape                            | Clear focus                                                                          |
| i                                 | Edit focused text                                                                    |
| l / Ctrl + Arrow Right            | Move current element to right by 10                                                  |
| h / Ctrl + Arrow Left             | Move current element to left by 10                                                   |
| j / Ctrl + Arrow Down             | Move current element to down by 10                                                   |
| k / Ctrl + Arrow Up               | Move current element to up by 10                                                     |
| Ctrl + f / Arrow Right            | Move current element to right by 30                                                  |
| Ctrl + b / Arrow Left             | Move current element to left by 30                                                   |
| Ctrl + n / Arrow Down             | Move current element to down by 30                                                   |
| Ctrl + p / Arrow Up               | Move current element to up by 30                                                     |
| 0 / Ctrl + a / Home               | Move current element current to left end                                             |
| $ / Ctrl + e / End                | Move current element current to right end                                            |
| g / Ctrl + Meta + a / Ctrl + Home | Move current element current to top                                                  |
| G / Ctrl + Meta + e / Ctrl + End  | Move current element current to bottom                                               |
| Ctrl + Shift + Arrow Right        | Increase current element width 10                                                    |
| Ctrl + Shift + Arrow Left         | Decrease current element width 10                                                    |
| Ctrl + Shift + Arrow Down         | Increase current element height 10                                                   |
| Ctrl + Shift + Arrow Up           | Decrease current element height 10                                                   |
| Shift + l / Shift + Arrow Right   | Increase current element width 30                                                    |
| Shift + h / Shift + Arrow Left    | Decrease current element width 30                                                    |
| Shift + j / Shift + Arrow Down    | Increase current element height 30                                                   |
| Shift + k / Shift + Arrow Up      | Decrease current element height 30                                                   |
| x / Backspace / Delete            | Delete current element                                                               |
| `>` / ctrl + `>`                  | Increase font size                                                                   |
| `<` / ctrl + `<`                  | Decrease font size                                                                   |

# Screenshots

![image](https://user-images.githubusercontent.com/10719495/113324468-a909a300-9306-11eb-9b34-83a8f199be98.png)

![image](https://user-images.githubusercontent.com/10719495/113324768-07368600-9307-11eb-801f-1052370db16d.png)

![image](https://user-images.githubusercontent.com/10719495/113316314-b706f600-92fd-11eb-8f83-e11dfd4f9a94.png)

# Development

```
pnpm install
pnpm dev
```
