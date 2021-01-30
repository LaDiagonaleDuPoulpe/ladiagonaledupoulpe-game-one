using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.DialogBox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.UI.DialogBoxs
{
	/// <summary>
	/// Manager of the dialogbox of one scene.
	/// Allows you to command dialog box of the scene : some messages will be auto launched, some others will be load by signal or key.
	/// </summary>
	public class DialoxBoxManager : Node, IDialogBoxManager
	{
		#region Fields
		private Timer _timer = null;
		private List<DialogBoxExchange> _exchanges = null;
		private DialogBoxExchange _currentExchange = null;
		private DialogBox _dialogBox = null;
		#endregion

		#region Constructors
		private DialoxBoxManager() { }
		#endregion

		#region Public methods
		public override void _Ready()
		{
			base._Ready();

			this.AttachEvents();

			this.DialogBox = this.GetRootNode<DialogBox>();
			this.CreateTimer();
		}

		private void AttachEvents()
        {
			EventsProxy eventsProxy = this.GetRootNode<EventsProxy>();
			eventsProxy.DialogBoxEvents.AttachStartOneDialog(this, nameof(EventsProxy_StartOneDialog));
			eventsProxy.DialogBoxEvents.AttachEndOfAllMessages(this, nameof(StopDisplayMessagesOfOneExchange));
		}

		/// <summary>
		/// Preloads data about the dialog box
		/// </summary>
		public void Preload(List<DialogBoxExchange> contents)
		{
			this._exchanges = contents;
		}

		/// <summary>
		/// Starts a dialog box exchange
		/// </summary>
		/// <param name="key">Key of exchange</param>
		public void Start(string key)
		{
			this._currentExchange = this._exchanges.First(item => item.Key == key);
			this._timer.Start(this._currentExchange.TimeBeforeStart / 1000);
		}
		#endregion

		#region Internal methods
		private void EventsProxy_StartOneDialog(string key)
        {
			this.Start(key);
        }

		private void CreateTimer()
		{
			this._timer = new Timer();
			this._timer.Autostart = false;
			this.AddChild(this._timer);

			this._timer.Connect("timeout", this, nameof(ActiveMethodAfterTimeOut));
		}

		private void ActiveMethodAfterTimeOut()
		{
			this._timer.Stop();
			if (this._currentExchange != null)
			{
				this.DialogBox.Start(this._currentExchange.Messages);
				this._currentExchange = null;
			}
		}

		private void StopDisplayMessagesOfOneExchange()
		{
			this.GetRootNode<EventsProxy>().DialogBoxEvents.BeEndOfOneExchange();
		}

		private void ShowDialog()
		{
			GD.Print("ShowDialog event, 13:07/2020, seems to not run ... for now, don't now why ...");
		}
		#endregion

		#region Properties
		/// <summary>
		/// Dialog box scene to display exchange items
		/// </summary>
		public DialogBox DialogBox { get => this._dialogBox; private set => this._dialogBox = value; }
		#endregion
	}
}
