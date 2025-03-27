"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt


bcrypt = Bcrypt()
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    # Verificar si el usuario ya existe
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "the user already exist"}), 409

    # Crear usuario y guardar en la DB
    
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "user succesfully register"}), 201

@api.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    email=data.get("email")
    password=data.get("password")

    user=User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error":"incorrect credentials"}),401

    acces_token=create_access_token(identity=str(user.id))
    return jsonify({"token":acces_token,"message":"login successful"}),200

@api.route("/validate-token", methods=["GET"])
@jwt_required()
def validate_token():
    user_id=get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"message":"valid token","user_id":user.serialize()}),200   
