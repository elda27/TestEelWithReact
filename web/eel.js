// Empty script
eel = {
  submit: function () {
    return new Promise(function (resolve, reject) {
      resolve(JSON.stringify({
        "success": false,
        "message": "Always failure due to dummy script."
      }))
    })
  }
}