using Godot;
using System;
using Godot.Collections;

namespace WAT 
{
	
	public class Recorder : Node
	{
		Godot.Object What;
		Godot.Collections.Dictionary<String, System.Object> Properties = new Godot.Collections.Dictionary<String, System.Object>();
		bool isRecording = false;
	
		public void Start() { this.isRecording = true; }
		public void Stop() { this.isRecording = false; }
		
		public void Record(Godot.Object what, Godot.Collections.Array properties)
		{
            this.What = what;
			foreach(string Property in properties){
                this.Properties[Property] = new Godot.Collections.Array();
			}
		}
		
		public override void _Process(float delta)
		{
			if(this.isRecording) { this.Capture(); }
		}
		
		private void Capture()
		{
			if(IsInstanceValid(this.What)){
				foreach(var Property in this.Properties.Keys){
					Godot.Collections.Array values = (Godot.Collections.Array)this.Properties[Property];
					values.Add(this.What.Get(Property));
				}
			}
		}
		
		public Godot.Collections.Array GetPropertyTimeline(string Property){
			return (Godot.Collections.Array)this.Properties[Property];
		}
		
		public Godot.Collections.Dictionary GetPropertyMap()
		{
			return (Godot.Collections.Dictionary)this.Properties;
		}
	}
}

