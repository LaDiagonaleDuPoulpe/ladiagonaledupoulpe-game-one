using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Signals
{
    /// <summary>
    /// Class to be auto loaded as the singleton
    /// </summary>
    public class EventsProxy : Node
    {
        #region Fields
        private HealthCharacterEvents _healthCharacterEvents = new HealthCharacterEvents();
        private ItemsEvents _itemsEvents = new ItemsEvents();
        private NonPlayerCharacterEvents _nonPlayerCharacterEvents = new NonPlayerCharacterEvents();
        private QuestEvents _questEvents = new QuestEvents();
        private SynaleEvents _synaleEvents = new SynaleEvents();
        private DialogBoxEvents _dialogBoxEvents = new DialogBoxEvents();
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.AddChild(this.HealthCharacterEvents);
            this.AddChild(this.ItemsEvents);
            this.AddChild(this.NonPlayerCharacterEvents);
            this.AddChild(this.QuestEvents);
            this.AddChild(this.SynaleEvents);
            this.AddChild(this.DialogBoxEvents);
        }
        #endregion

        #region Properties
        public HealthCharacterEvents HealthCharacterEvents { get => _healthCharacterEvents; }
        public ItemsEvents ItemsEvents { get => _itemsEvents; }
        public NonPlayerCharacterEvents NonPlayerCharacterEvents { get => _nonPlayerCharacterEvents; }
        public QuestEvents QuestEvents { get => _questEvents; }
        public SynaleEvents SynaleEvents { get => _synaleEvents; }
        public DialogBoxEvents DialogBoxEvents { get => _dialogBoxEvents; }
        #endregion
    }
}
