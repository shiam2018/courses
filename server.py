from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Устанавливаем текущую директорию как корень сервера
os.chdir(os.path.dirname(os.path.abspath(__file__)))

port = 8000
server_address = ('', port)

httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
print(f'Сервер запущен на порту {port}')
print(f'Откройте в браузере http://localhost:{port}/templates/index.html')
httpd.serve_forever() 