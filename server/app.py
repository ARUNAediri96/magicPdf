import os
from flask import Flask
from flask_cors import CORS
import yaml


app = Flask(__name__)
CORS(app)

def create_upload_folder():
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

def register_routes(app):
    with open('endpoints.yml', 'r') as stream:
        endpoints_data = yaml.safe_load(stream)
        paths = endpoints_data.get('paths', {})
        for path, methods in paths.items():
            for method, details in methods.items():
                operation_id = details.get('operationId')
                if operation_id:
                    action_module, action_function = operation_id.split('.')
                    action_module = __import__(f"actions.{action_module}", fromlist=[''])
                    action_function = getattr(action_module, action_function)
                    app.add_url_rule(path, view_func=action_function, methods=['POST'])


create_upload_folder()
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
