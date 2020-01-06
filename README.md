# Image Viewer

This is front end aplication for delivering and processing image data.
Use cases:
- log in / log out
- upload photos
- list user photos
- perform image actions: preview, rename, remove

To save resources images are processed to 800x800 resolution before sending to server 
   

### Instalation for development

1. Clone repository and run ``yarn``
2. Configuration: copy ``.env.example`` from main dir to ``.env`` and set server addres: ``REACT_APP_SERVER_URL`` or leave default
3. Run web server: ``yarn start``

### TODO
This is early version of application. Still is lot to do e.g:
- improve stylling
- user communication (event feedback messages)
- pagination
- tests
