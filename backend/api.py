from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import RedirectResponse
import pymysql.cursors
import uvicorn
from initScripts.mysqlDb import MysqlDb
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse


install()
console = Console()

import os
os.chdir("...")

# Customize traceback
install(show_locals=True)  # Show local variables in tracebacks

app = FastAPI()
