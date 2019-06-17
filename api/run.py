#!/usr/bin/env python
from eve import Eve
from whitenoise import WhiteNoise

app = Eve()
app.wsgi_app = WhiteNoise(app.wsgi_app, root="./build", index_file="index.html")

if __name__ == "__main__":
    app.run(port=3001)
