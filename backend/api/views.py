from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ActionSerializer
import json
import os
from datetime import date, datetime

JSON_FILE = os.path.join(os.path.dirname(__file__), "actions.json")

def load_actions():
    if not os.path.exists(JSON_FILE):
        return []
    with open(JSON_FILE, "r") as f:
        return json.load(f)
    
def save_actions(actions):
    with open(JSON_FILE, "w") as f:
        json.dump(actions, f, indent=4)

@api_view(["GET", "POST"])
def actions_list(request):
    actions = load_actions()

    if request.method == "GET":
        serializer = ActionSerializer(actions, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            new_id = max([a["id"] for a in actions], default=0) + 1
            data = serializer.validated_data
            data["id"] = new_id

            if isinstance(data["date"], (date, datetime)):
                data["date"] = data["date"].isoformat()

            actions.append(data)
            save_actions(actions)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH", "DELETE"])
def action_detail(request, pk):
    actions = load_actions()
    action = next((a for a in actions if a["id"] == pk), None)

    if not action:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    elif request.method in ["PUT", "PATCH"]:
        serializer = ActionSerializer(action, data=request.data, partial=(request.method=="PATCH"))
        if serializer.is_valid():
            index = actions.index(action)
            updated_data = serializer.validated_data

            if isinstance(updated_data.get("date"), (date, datetime)):
                updated_data["date"] = updated_data["date"].isoformat()
            actions[index] = {**action, **updated_data}
            save_actions(actions)
            return Response(actions[index])
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        actions.remove(action)
        save_actions(actions)
        return Response(status=status.HTTP_204_NO_CONTENT)