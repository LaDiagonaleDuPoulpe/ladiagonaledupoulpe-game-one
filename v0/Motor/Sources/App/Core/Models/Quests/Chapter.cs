using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests
{
    /// <summary>
    /// Chapter that contains quests
    /// </summary>
    public class Chapter : Node, IChapter
    {
        #region Fields
        private List<IQuest> _questList = new List<IQuest>();
        private IQuest _currentQuest = null;
        #endregion

        #region Constructors
        public Chapter() { }

        public Chapter(int id, int displayedId, string title): this()
        {
            this.Id = id;
            this.DisplayedId = displayedId;
            this.Title = title;
        }

        public Chapter(int displayedId, string title): this(0, displayedId, title)
        {}
        #endregion

        #region Public methods
        /// <summary>
        /// Activates the chapter
        /// </summary>
        public void Activate()
        {
            if (! this.IsDone && ! this.IsActive)
            {
                this.IsActive = true;
                this._currentQuest = this._questList.First(item => !item.IsActive);
                this._currentQuest.Activate();
            }            
        }

        public void Add(IQuest item)
        {
            this.AddChild(item as Node);
            this._questList.Add(item);
        }

        public void Clear()
        {
            this._questList.ForEach(item => this.RemoveChild(item as Node));
            this._questList.Clear();
        }

        public bool Contains(IQuest item)
        {
            return this._questList.Contains(item);
        }

        public void CopyTo(IQuest[] array, int arrayIndex)
        {
            this._questList.CopyTo(array, arrayIndex);
        }

        public IEnumerator<IQuest> GetEnumerator()
        {
            return this._questList.GetEnumerator();
        }

        public int IndexOf(IQuest item)
        {
            return this._questList.IndexOf(item);
        }

        public void Insert(int index, IQuest item)
        {
            this.AddChild(item as Node);
            this._questList.Insert(index, item);
        }

        public bool Remove(IQuest item)
        {
            bool isRemoved = this._questList.Remove(item);

            if (isRemoved)
            {
                this.RemoveChild(item as Node);
            }

            return isRemoved;
        }

        public void RemoveAt(int index)
        {
            IQuest item = this[index];

            this._questList.RemoveAt(index);
            this.RemoveChild(item as Node);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._questList.GetEnumerator();
        }
        #endregion

        #region Properties
        public IQuest this[int index] { get => this._questList[index]; set => this._questList[index] = value; }

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

        public int Count => this._questList.Count;

        public bool IsReadOnly => false;

        /// <summary>
        /// Is done if all quests are achieved
        /// </summary>
        public bool IsDone { get => this._questList.All(item => item.IsAchieved); }
        
        /// <summary>
        /// List of quests of the chapter
        /// </summary>
        public List<IQuest> Quests { set => this._questList = value; }

        /// <summary>
        /// True if chapter is active
        /// </summary>
        public bool IsActive { get; private set; }
        #endregion
    }
}
