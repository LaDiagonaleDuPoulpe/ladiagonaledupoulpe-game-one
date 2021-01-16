using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// Execute request for code compilation
/// </summary>
public class ValidateCode : Node
{
	#region Fields
	private TextEdit _textEditplayerCode;
	private CompileCodeEditor _requestCompileCode;
	private MovingSceneManager _movingSceneManager;
	#endregion
	public override void _Ready()
	{
		_textEditplayerCode = this.GetNode<TextEdit>("Button/TxtCodePlayer");
		_movingSceneManager = this.Owner as MovingSceneManager;

		GlobalDataService dataService = this.GetRootNode<GlobalDataService>();
		var compilerConfiguration = dataService.GlobalSettings.Apis.Compiler;
		_requestCompileCode = new CompileCodeEditor(compilerConfiguration);
		this.AddChild(_requestCompileCode);

		this.GetNode<Button>("Button").Connect("pressed", this, nameof(_on_Button_pressed));
		_requestCompileCode.Connect(nameof(JsonHttpRequest.AfterCommandExecuted), _movingSceneManager, nameof(MovingSceneManager.Request_OnAfterCommandCompilationExecuted));

	}

	/// <summary>
	/// Called when player click on compile button  
	/// </summary>
	private void _on_Button_pressed()
	{

		_requestCompileCode.SendRequest(_textEditplayerCode.Text, null);
	}

}



