using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts.Compiler.Models.Commands;
using System;

public class ValidateCode : Node
{
	// Called when the node enters the scene tree for the first time.
	#region Fields
	private TextEdit _textEditplayerCode;
	private ExecuteCodeCommand _executeCodeCommand;
	#endregion
	public override void _Ready()
	{
		_textEditplayerCode = GetTree().Root.GetNode<TextEdit>("Battle/Button/TxtCodePlayer");
		_executeCodeCommand = GetTree().Root.GetNode<ExecuteCodeCommand>("Battle/ExecuteCodeCommand");

	}

	/// <summary>
	/// Called when player click on compile button
	/// </summary>
	private void _on_Button_pressed()
	{
		var compileCodeEditor = new CompileCodeEditor();
		AddChild(compileCodeEditor);
		compileCodeEditor.SendRequest(_textEditplayerCode.Text, _executeCodeCommand);
	}

}



