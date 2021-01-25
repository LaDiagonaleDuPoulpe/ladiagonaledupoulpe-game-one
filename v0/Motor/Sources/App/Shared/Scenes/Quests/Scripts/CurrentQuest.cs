using Godot;
using System;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;

/// <summary>
/// Displays the current quest
/// </summary>
public class CurrentQuest : Node2D
{
	#region Fields
	private Button _showQuests = null;
	private Sprite _icon = null;
	private RichTextLabel _title = null;
	private Particles2D _animation = null;
	private Timer _animationTimer = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		CanvasLayer layer = this.GetNode<CanvasLayer>("CanvasLayer");
		this._showQuests = layer.GetNode<Button>("ShowQuests");
		this._icon = this._showQuests.GetNode<Sprite>("Icon");
		this._animation = this._showQuests.GetNode<Particles2D>("Particles2D");
		this._animationTimer = this._showQuests.GetNode<Timer>("AnimationTimer");
		this._title = this._showQuests.GetNode<RichTextLabel>("Title");

		this.AttachQuestEvents();
	}

	public void SetVisibility(bool isVisible)
	{
		this._showQuests.Visible = isVisible;
		this._icon.Visible = isVisible;
		this._title.Visible = isVisible;
	}
	#endregion

	#region Internal methods
	private void AttachQuestEvents() 
	{
		QuestEvents events = this.GetRootNode<QuestEvents>();

		events.AttachNewQuestActivated(this, nameof(QuestEvents_NewQuestActivated));
		events.AttachQuestIsDone(this, nameof(QuestEvents_QuestIsDone));
	}

	private void QuestEvents_NewQuestActivated(Quest quest)
	{
		this._animation.Visible = true;
		this._animationTimer.Start();
		this._title.BbcodeText = $"[color=white]{quest.Name}[/color]";
	}

	private void _on_Timer_timeout()
	{
		this._animation.Visible = false;
	}

	private void QuestEvents_QuestIsDone(Quest quest)
	{
		this._title.BbcodeText = $"[color=grey][s]{quest.Name}[/s][/color]";
	}
	#endregion
}

