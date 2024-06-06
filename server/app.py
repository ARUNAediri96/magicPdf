import os
from flask import Flask
import yaml


app = Flask(__name__)

def create_upload_folder():
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

def register_routes(app):
    with open('endpoints.yml', 'r') as stream:
        endpoints = yaml.safe_load(stream)
        for endpoint in endpoints:
            action_module = __import__(f"actions.{endpoint['action']}", fromlist=[''])
            action_function = getattr(action_module, endpoint['function'])
            app.add_url_rule(endpoint['url'], view_func=action_function, methods=endpoint['methods'])

create_upload_folder()
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
