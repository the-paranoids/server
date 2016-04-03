import sys
import json
from subprocess import call 

def return_tuples(array) :
    lst = []
    size = len(array)
    for i in range(0,size,3) :
        lst.append((array[i], array[i+1], array[i+2]))
        #lst.append(',')
    return lst



'''
for i in range(2,len(sys.argv)) :
    array2.append(str(sys.argv[i]))
'''
import pprint as pp
with open('./data/data.json') as data_file :    
    infos = json.load(data_file)

#pp.pprint(data)

print infos
username = infos['username']
signature = infos['signature']
lst = []

for dic in signature :
    lst.append(dic['keyCode'])
    lst.append(dic['keyAction'])
    lst.append(dic['time'])



lst2 = return_tuples(lst)

print(lst)


with open('../data/'+str(username)+'.keypress','w+') as file :
    file.write(str(lst2).replace("u","").replace("'",""))

#for item in lst2 :
#    file.write(str(lst2[i]))
call(["python","authenticate.py",str(username)])