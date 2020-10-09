import uuid
import json


class Experiment(object):
    def __init__(self,name: str):
        self.name = name

       


    def write_metric(self, metric_name, metric_value,id):
        metric_dict={"name": metric_name,
                    "value": metric_value}

        
        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        #loop
        for i in range(len(data["runs"])):
         if data["runs"][i]["id"]==id:
            data["runs"][i]["metrics"].append(metric_dict)
        

    def write_parameter(self, parameter_name, parameter_value,id):
         
        param_dict={"name": parameter_name,
                    "value": parameter_value}

        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        for i in range(len(data["runs"])):
         if data["runs"][i]["id"]==id:

            data["runs"][i]["parameters"].append(param_dict)


    def write_measurement(self, measurement_name, measurement,id):
        
        measurement_dict={measurement_name,measurement}
        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        for i in range(len(data["runs"])):
         if data["runs"][i]["id"]==id:
           #print(data["runs"][0]["measurements"])
           data["runs"][0]["measurements"].append(measurement_dict)
           data["name"]="measurement_dict)"
        

  
    def write_result(self, result,idd):
        
        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        for i in range(len(data["runs"])):
         print(data["runs"][i]['result']['any'])
         if data["runs"][i]["id"]==idd:
            data["runs"][i]["result"]["any"]=result

 
    def __repr__(self):
        return 'Experiment({})'.format(self.name)

    
     
    def save_run(self,id):
        
        
        dicto={
            "id":id,
            "parameters":[],
            "metrics": [],
            "measurements": [],
            "result":{'any':""}
            }
        
        
        
        #filename = 'experiment.json'
        experiment={"name": self.name,"runs":[dicto] }

        with open('experiment.json', 'w+') as json_file:
          json.dump(experiment, json_file)
        
           
        
            
        
        
def main():
 e=Experiment("tests")
 idd=str(uuid.uuid1())
 e.save_run(idd) 
 e.write_parameter("test", "5", idd)
 e.write_measurement("test", "test", idd)
 e.write_metric("metric_name", "50", idd)
 e.write_result("test", idd)

main()
    
    
    
