import uuid
import json


class Experiment(object):
    def __init__(self,name: str):
        self.name = name

       


    def write_metric(self, metric_name, metric_value,id):
        metric_dict={"name": metric_name,
                    "value": metric_value}

        
        filename = 'experiment.json'
        with open(filename, 'r+') as f:
            data = json.load(f)
        #loop
        for j in range(len(data)):
         #print(len(data["runs"]))
         for i in range(len(data[j]["runs"])):

          if data[j]["runs"][i]["id"]==id:
           if data[j]["runs"][i]["id"]==id:
            data[j]["runs"][i]["metrics"].append(metric_dict)
            
        

    def write_parameter(self, parameter_name, parameter_value,id):
         
        param_dict={"name": parameter_name,
                    "value": parameter_value}

        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        for j in range(len(data)):
         #print(len(data["runs"]))
         for i in range(len(data[j]["runs"])):

          if data[j]["runs"][i]["id"]==id:

            data[j]["runs"][i]["parameters"].append(param_dict)
        with open("experiment.json", "w") as f:
            json.dump(data, f)  # serializing back to the original file

    def write_measurement(self, measurement_name, measurement,id):
        
        measurement_dict={measurement_name,measurement}
        filename = 'experiment.json'
        with open(filename, 'r') as f:
            data = json.load(f)
        for j in range(len(data)):
         #print(len(data["runs"]))
         for i in range(len(data[j]["runs"])):

          if data[j]["runs"][i]["id"]==id:
           #print(data["runs"][0]["measurements"])
           data[j]["runs"][i]["measurements"].append(measurement_dict)
        with open("experiment.json", "w") as f:
           json.dump(data, f)  # serializing back to the original file  
        

  
    def write_result(self, result,idd):
        
        filename = 'experiment.json'
        with open(filename, 'r') as f:
         data=json.load(f)
        for j in range(len(data)):
         #print(len(data["runs"]))
         for i in range(len(data[j]["runs"])):

          if data[j]["runs"][i]["id"]==idd:
           data[j]["runs"][i]["result"]["any"]=result
        with open("experiment.json", "w") as f:
            json.dump(data, f)  # serializing back to the original file
 
    def __repr__(self):
        return 'Experiment({})'.format(self.name)

    
     
    def save_run(self,id):# add run to an experiment
        """
        Create new dict 
        save run    

        """  
        
        dicto={
            "id":id,
            "parameters":[],
            "metrics": [],
            "measurements": [],
            "result":{'any':""}
            }
        
        
        
        #filename = 'experiment.json'
        #experiment={"name": self.name,"runs":[] }
    
        with open('experiment.json', "r+") as f:  # reading a file
          data = json.load(f)  # deserialization
        #data.append(experiment)
        data[-1]["runs"].append(dicto)#add run to a specific experiment, here the id of the experiment must be added
        with open("experiment.json", "w") as f:
            json.dump(data, f)  # serializing back to the original file
        #with open('experiment.json', 'w') as f:
         #  json.dump(experiment, f)
          
          
        

      
    def create_new_experiment(self):
        dicto={
            "id":id,
            "parameters":[],
            "metrics": [],
            "measurements": [],
            "result":{'any':""}
            }
        experiment={"name": self.name,"runs":[dicto] }

        with open('experiment.json', "r+") as f:  # reading a file
          data = json.load(f)  # deserialization
        data.append(experiment)
        with open("experiment.json", "w") as f:
            json.dump(data, f)  # serializing back to the original file
    
            
    # def create_new_experiment(self):
         
        
def main():
 e=Experiment("qkd")
 id0=str(uuid.uuid1())
# e.create_new_experiment()
 #example of an experiment with multiple runs
 e.save_run(id0) # run nb 1
 id3=str(uuid.uuid1())
 e.save_run(id3)#run 2
 #e.write_parameter("test", "5", idd)
# e.write_measurement("test", "test", idd)
# e.write_metric("metric_name", "50", idd)
 e.write_result("ysdjkjhn", id0)
 e.write_result("test3", id3)
 
 ###############
 t=Experiment("###")
 id2=str(uuid.uuid1())
 t.save_run(id2)
 t.write_result("#####", id2)
 #########################
main()
