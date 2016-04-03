from functools import partial
from core import KeystrokeCaptureData
from model import Fingerprint, FingerprintDatabase
from sugar import create_fingerprint_from_capture_data
from sys import argv
DATA_DIR= "./"
script, username = argv
def create_object(f):
    data = KeystrokeCaptureData()
    return data._deserialize_from_file(f)

def create_print(username,data):
    data.save_to_file( DATA_DIR+username )
    fingerprint= create_fingerprint_from_capture_data( username, data )
    fingerprint.save_to_file( DATA_DIR+username )
    print "Finished creating fingerprint!"

file = open('./'+ username+'.keypresses','r')
data = create_object(file)
create_print(username,data)
