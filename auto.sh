#!/usr/bin/env bash
cd `dirname $0`
$(which pipenv) run python3 ./update_data.py
git add ./json_data
git commit -m "update data"
git push origin main
