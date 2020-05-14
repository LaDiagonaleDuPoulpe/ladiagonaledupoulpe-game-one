using Godot;
using System;

public class Motor 
{
	private static Motor _instance = null;

	public DefaultConfiguration DefaultConfiguration { get; set; }

	private Motor() { }

	public static Motor GetInstance()
	{
		if(_instance == null)
		{
			_instance =  new Motor();
		}

		return _instance;
	}
}
