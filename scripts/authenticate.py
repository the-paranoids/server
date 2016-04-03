from functools import partial
from core import KeystrokeCaptureData
from model import Fingerprint, FingerprintDatabase
from sugar import create_fingerprint_from_capture_data
DATA_DIR= "./"
def match_fingerprint(data):
    db= FingerprintDatabase().load_from_dir( DATA_DIR )
    f= create_fingerprint_from_capture_data( "NoName", data )
    best= db.best_match( f )
    print best.name

def create_object(f):
    data = KeystrokeCaptureData()
    return data._deserialize_from_file(f)

file = open('./Test.keypresses','r')
data = create_object(file)
match_fingerprint(data)