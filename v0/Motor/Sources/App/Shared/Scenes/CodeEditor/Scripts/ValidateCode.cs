using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts.Models.Commands;
using System;

public class ValidateCode : Node
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		
	}

	/// <summary>
	/// Called when player click on compile button
	/// </summary>
	private void _on_Button_pressed()
	{
			string code = GetTree().Root.GetNode<TextEdit>("Node2D/Button/TxtCodePlayer").Text;
			var compileCodeEditor = new CompileCodeEditor();
			AddChild(compileCodeEditor);
			Sprite sprite = GetTree().Root.GetNode<Sprite>("Node2D/Sprite");
			compileCodeEditor.SendRequest(code, new ExecuteCodeCommand(sprite));

	}

}



