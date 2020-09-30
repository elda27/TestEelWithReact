import eel
from typing import List
import json


@eel.expose
def submit(text: str, value: float, flags: List[str]):
    message = f'{flags}::{text}::{value}'
    print('Submit', message)
    return json.dumps({
        'success': False,
        'message': message,
    })


if __name__ == "__main__":
    eel.init("web/bundle")
    eel.start("index.html", port=10000)
