import traceback

try:
    from app.main import app
    print("Success")
except Exception as e:
    with open("error.log", "w", encoding="utf-8") as f:
        f.write(traceback.format_exc())
    print("Failed - see error.log")
