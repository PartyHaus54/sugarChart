# Instructions for integrating django:
The trickiest part is reproducing the virtual environment on the computer in question
Pull down repo as normal:
In the server directory (sugarChart/server/): `python3 -m venv sugar-venv`
`source sugar-venv/bin/activate` (To deactivate the virtual environment just use `deactivate`)
`python -m pip install Django`
`pip install djangorestframework`
`pip install markdown `      # Markdown support for the browsable API (Probably optional)
`pip install django-filter`  # Filtering support
`pip install django-cors-headers`