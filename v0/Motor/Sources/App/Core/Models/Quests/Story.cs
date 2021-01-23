using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests
{
    public class Story : Node, IStory
    {
        #region Fields
        private List<IChapter> _chapterList = new List<IChapter>();
        private IChapter _currentChapter = null;
        #endregion

        #region Constructors
        public Story() { }

        public Story(int id): this()
        {
            this.Id = id;
        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this.GetRootNode<QuestEvents>().AttachNextRequestIntended(this, nameof(NextRequestIntended));
        }

        public void Start()
        {
            this._currentChapter = this.GetNextInactiveChapter();
            this._currentChapter.Activate();
        }

        public void Add(IChapter item)
        {
            this.AddChild(item as Node);
            this._chapterList.Add(item);
        }

        public void Clear()
        {
            this._chapterList.ForEach(item => this.RemoveChild(item as Node));
            this._chapterList.Clear();
        }

        public bool Contains(IChapter item)
        {
            return this._chapterList.Contains(item);
        }

        public void CopyTo(IChapter[] array, int arrayIndex)
        {
            this._chapterList.CopyTo(array, arrayIndex);
        }

        public IEnumerator<IChapter> GetEnumerator()
        {
            return this._chapterList.GetEnumerator();
        }

        public int IndexOf(IChapter item)
        {
            return this._chapterList.IndexOf(item);
        }

        public void Insert(int index, IChapter item)
        {
            this.AddChild(item as Node);
            this._chapterList.Insert(index, item);
        }

        public bool Remove(IChapter item)
        {
            bool isRemoved = this._chapterList.Remove(item);

            if (isRemoved)
            {
                item.ToBeFree(this);
            }

            return isRemoved;
        }

        public void RemoveAt(int index)
        {
            IChapter item = this[index];

            this._chapterList.RemoveAt(index);
            item.ToBeFree(this);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._chapterList.GetEnumerator();
        }
        #endregion

        #region Internal methods
        private void NextRequestIntended()
        {
            if (! (this._currentChapter?.HasNextInactiveQuest).GetValueOrDefault(false))
            {
                this._currentChapter?.Inactivate();
                this._currentChapter = this.GetNextInactiveChapter();
                this._currentChapter?.Activate(false);
            }
            bool? isQuestActivated = this._currentChapter?.ActivateNextQuest();
        }

        private IChapter GetNextInactiveChapter()
        {
            return this._chapterList.FirstOrDefault(item => !item.IsActive);
        }
        #endregion

        #region Properties
        public IChapter this[int index] { get => this._chapterList[index]; set => this._chapterList[index] = value; }

        /// <summary>
        /// Id of the chapter
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Chapter step (Displayed id)
        /// </summary>
        public int DisplayedId { get; set; }

        /// <summary>
        /// Title of the chapter
        /// </summary>
        public string Title { get; set; }

        public int Count => this._chapterList.Count;

        public bool IsReadOnly => false;

        /// <summary>
        /// Is done if all quests are achieved
        /// </summary>
        public bool IsDone { get => this._chapterList.All(item => item.IsDone); }
        #endregion
    }
}
